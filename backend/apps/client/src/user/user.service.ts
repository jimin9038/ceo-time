import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable, Logger } from '@nestjs/common'
import type { User } from '@prisma/client'
import { hash } from 'argon2'
import { Cache } from 'cache-manager'
import type { Request } from 'express'
import {
  DuplicateFoundException,
  UnidentifiedException,
  UnprocessableDataException
} from '@libs/exception'
import { PrismaService } from '@libs/prisma'
import { JwtAuthService } from './../../../../libs/auth/src/jwt/jwt-auth.service'
import type { SignUpDto } from './dto/signup.dto'
import type { UsernameDto } from './dto/username.dto'

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name)

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly prisma: PrismaService,
    private readonly jwtAuthService: JwtAuthService
  ) {}

  async signUp(req: Request, signUpDto: SignUpDto) {
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

    const user: User = await this.createUser(signUpDto)
    return user
  }

  // async updatePassword(
  //   { newPassword }: NewPasswordDto,
  //   req: Request
  // ): Promise<string> {
  //   if (!this.isValidPassword(newPassword)) {
  //     throw new UnprocessableDataException('Bad password')
  //   }

  //   await this.updateUserPasswordInPrisma(email, newPassword)

  //   return 'Password Reset successfully'
  // }

  // async updateUserPasswordInPrisma(
  //   email: string,
  //   newPassword: string
  // ): Promise<User> {
  //   const user = await this.prisma.user.update({
  //     where: {
  //       email
  //     },
  //     data: {
  //       password: await hash(newPassword)
  //     }
  //   })
  //   this.logger.debug(user, 'updateUserPasswordInPrisma')

  //   return user
  // }

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
    const user = await this.getUserCredential(username)
    if (!(user && (await this.jwtAuthService.isValidUser(user, password)))) {
      this.logger.debug('user not exist or login fail')
      throw new UnidentifiedException('password')
    }
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
        email: true
      }
    })
    this.logger.debug(userWithProfile, 'getUserProfile')
    return userWithProfile
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
