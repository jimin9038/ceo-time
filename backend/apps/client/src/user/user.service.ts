import { Inject, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import type { User } from '@prisma/client'
import { hash } from 'argon2'
import type { Request } from 'express'
import { ExtractJwt } from 'passport-jwt'
import { type AuthenticatedRequest, JwtAuthService } from '@libs/auth'
import { emailAuthenticationPinCacheKey } from '@libs/cache'
import { EMAIL_AUTH_EXPIRE_TIME } from '@libs/constants'
import {
  ConflictFoundException,
  DuplicateFoundException,
  InvalidJwtTokenException,
  UnidentifiedException,
  UnprocessableDataException
} from '@libs/exception'
import { PrismaService } from '@libs/prisma'
import type { NewPasswordDto } from './dto/newPassword.dto'
import type { SignUpDto } from './dto/signup.dto'
import type { UpdateUserEmailDto } from './dto/update-user-email.dto'
import type { UserEmailDto } from './dto/userEmail.dto'
import type { UsernameDto } from './dto/username.dto'
import type {
  EmailAuthJwtPayload,
  EmailAuthJwtObject
} from './interface/jwt.interface'

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name)

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly jwtAuthService: JwtAuthService
  ) {}

  async signUp(req: Request, signUpDto: SignUpDto) {
    const { email } = await this.verifyJwtFromRequestHeader(req)
    if (email != signUpDto.email) {
      this.logger.debug(
        {
          verifiedEmail: email,
          requestedEmail: signUpDto.email
        },
        'signUp - fail (unauthenticated email)'
      )
      throw new UnprocessableDataException('The email is not authenticated one')
    }

    const duplicatedUser = await this.prisma.user.findUnique({
      where: {
        username: signUpDto.username
      }
    })
    if (duplicatedUser) {
      this.logger.debug('username duplicated')
      throw new DuplicateFoundException('Username')
    }

    if (!this.isValidUsername(signUpDto.username)) {
      this.logger.debug('signUp - fail (invalid username)')
      throw new UnprocessableDataException('Bad username')
    } else if (!this.isValidPassword(signUpDto.password)) {
      this.logger.debug('signUp - fail (invalid password)')
      throw new UnprocessableDataException('Bad password')
    }

    await this.deletePinFromCache(emailAuthenticationPinCacheKey(email))

    const user: User = await this.createUser(signUpDto)
    const CreateUserProfileData: CreateUserProfileData = {
      userId: user.id,
      realName: signUpDto.realName
    }
    await this.createUserProfile(CreateUserProfileData)
    await this.registerUserToPublicGroup(user.id)

    return user
  }

  async updatePassword(
    { newPassword }: NewPasswordDto,
    req: Request
  ): Promise<string> {
    if (!this.isValidPassword(newPassword)) {
      throw new UnprocessableDataException('Bad password')
    }

    const { email } = await this.verifyJwtFromRequestHeader(req)
    await this.deletePinFromCache(emailAuthenticationPinCacheKey(email))
    await this.updateUserPasswordInPrisma(email, newPassword)

    return 'Password Reset successfully'
  }

  async verifyJwtFromRequestHeader(
    req: Request,
    jwtVerifyOptions: JwtVerifyOptions = {}
  ): Promise<EmailAuthJwtObject> {
    const token = ExtractJwt.fromHeader('email-auth')(req) ?? ''
    const options = {
      secret: this.config.get('JWT_SECRET'),
      ...jwtVerifyOptions
    }
    try {
      const decodedJwtObject = await this.jwtService.verifyAsync(token, options)
      this.logger.debug(
        {
          token,
          verifyOption: options,
          decodedJwtObject
        },
        'verifyJwtFromRequestHeader - pass'
      )
      return decodedJwtObject
    } catch (error) {
      this.logger.debug(
        {
          token,
          verifyOption: options
        },
        'verifyJwtFromRequestHeader - fail'
      )
      throw new InvalidJwtTokenException(error.message)
    }
  }

  async updateUserPasswordInPrisma(
    email: string,
    newPassword: string
  ): Promise<User> {
    const user = await this.prisma.user.update({
      where: {
        email
      },
      data: {
        password: await hash(newPassword)
      }
    })
    this.logger.debug(user, 'updateUserPasswordInPrisma')

    return user
  }

  async verifyPinAndIssueJwt({
    pin,
    email
  }: EmailAuthenticationPinDto): Promise<string> {
    await this.verifyPin(pin, email)

    const payload: EmailAuthJwtPayload = { email }
    const token = await this.createJwt(payload)

    return token
  }

  async verifyPin(pin: string, email: string): Promise<boolean> | never {
    const storedResetPin = await this.getPinFromCache(
      emailAuthenticationPinCacheKey(email)
    )

    if (!storedResetPin || pin !== storedResetPin) {
      this.logger.debug(
        {
          inputPin: pin,
          storedPin: storedResetPin
        },
        'verifyPin - input is different from stored one'
      )
      throw new UnidentifiedException(`pin ${pin}`)
    }
    return true
  }

  async getPinFromCache(key: string) {
    const storedPin = await this.cacheManager.get<string>(key)
    this.logger.debug({ key, value: storedPin }, 'getPinFromCache')
    return storedPin
  }

  async deletePinFromCache(key: string) {
    await this.cacheManager.del(key)
    this.logger.debug({ key }, 'deletePinFromCache')
  }

  async setPinInCache(key: string, value: string, ttl: number) {
    await this.cacheManager.set(key, value, ttl)
    this.logger.debug({ key, value, ttl }, 'setPinInCache')
  }

  async createJwt(payload: EmailAuthJwtPayload) {
    const jwt = await this.jwtService.signAsync(payload, {
      expiresIn: EMAIL_AUTH_EXPIRE_TIME
    })
    this.logger.debug({ jwt }, 'createJwt')
    return jwt
  }

  isValidUsername(username: string): boolean {
    const validUsername = /^[a-z0-9]{3,10}$/
    if (!validUsername.test(username)) {
      return false
    }
    return true
  }

  isValidPassword(password: string): boolean {
    const invalidPassword = /^(.{0,7}|[a-z]*|[A-Z]*|[0-9]*|[^a-zA-Z0-9]*)$/
    if (invalidPassword.test(password)) {
      return false
    }
    return true
  }

  async createUser(signUpDto: SignUpDto): Promise<User> {
    const encryptedPassword = await hash(signUpDto.password)

    const user = await this.prisma.user.create({
      data: {
        username: signUpDto.username,
        password: encryptedPassword,
        email: signUpDto.email
      }
    })
    this.logger.debug(user, 'createUser')
    return user
  }

  async deleteUser(username: string, password: string) {
    const deletedUser = await this.prisma.user.delete({
      where: {
        username
      }
    })
    this.logger.debug(deletedUser, 'deleted user')
  }

  async getUserCredential(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username }
    })
    this.logger.debug(user, 'getUserCredential')
    return user
  }

  async getUserProfile(username: string) {
    const userWithProfile = await this.prisma.user.findUniqueOrThrow({
      where: { username },
      select: {
        username: true,
        role: true,
        email: true,
        lastLogin: true,
        updateTime: true,
        userProfile: {
          select: {
            realName: true
          }
        }
      }
    })
    this.logger.debug(userWithProfile, 'getUserProfile')
    return userWithProfile
  }

  async updateUserEmail(
    req: AuthenticatedRequest,
    updateUserEmailDto: UpdateUserEmailDto
  ): Promise<User> {
    const { email } = await this.verifyJwtFromRequestHeader(req)
    if (email != updateUserEmailDto.email) {
      this.logger.debug(
        {
          verifiedEmail: email,
          requestedEmail: updateUserEmailDto.email
        },
        'updateUserEmail - fail (different from the verified email)'
      )
      throw new UnprocessableDataException('The email is not authenticated one')
    }

    await this.deletePinFromCache(emailAuthenticationPinCacheKey(email))

    await this.prisma.user.findUniqueOrThrow({
      where: { id: req.user.id }
    })

    const user = await this.prisma.user.update({
      where: { id: req.user.id },
      data: {
        email: updateUserEmailDto.email
      }
    })
    this.logger.debug(user, 'updateUserEmail')
    return user
  }

  async updateUserProfile(
    userId: number,
    updateUserProfileDto: UpdateUserProfileDto
  ): Promise<UserProfile> {
    await this.prisma.userProfile.findUniqueOrThrow({
      where: { userId }
    })

    const userProfile = await this.prisma.userProfile.update({
      where: { userId },
      data: {
        realName: updateUserProfileDto.realName
      }
    })
    this.logger.debug(userProfile, 'updateUserProfile')
    return userProfile
  }

  async checkDuplicatedUsername(usernameDto: UsernameDto) {
    const duplicatedUser = await this.prisma.user.findUnique({
      where: {
        username: usernameDto.username
      }
    })

    if (duplicatedUser) {
      this.logger.debug('exception (username duplicated)')
      throw new DuplicateFoundException('user')
    }
  }
}
