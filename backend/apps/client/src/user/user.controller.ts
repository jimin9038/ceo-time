import {
  Body,
  Get,
  InternalServerErrorException,
  Patch,
  Post,
  Req,
  Res,
  UnauthorizedException,
  Controller,
  NotFoundException,
  Logger,
  Delete,
  Query
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { Request, type Response } from 'express'
import { AuthenticatedRequest, AuthNotNeededIfOpenSpace } from '@libs/auth'
import {
  UnprocessableDataException,
  InvalidJwtTokenException,
  DuplicateFoundException,
  UnidentifiedException,
  ConflictFoundException
} from '@libs/exception'
import { DeleteUserDto } from './dto/deleteUser.dto'
// import { NewPasswordDto } from './dto/newPassword.dto'
import { SignUpDto } from './dto/signup.dto'
import { UsernameDto } from './dto/username.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name)

  constructor(private readonly userService: UserService) {}

  // @Patch('password-reset')
  // @AuthNotNeededIfOpenSpace()
  // async updatePassword(
  //   @Body() newPasswordDto: NewPasswordDto,
  //   @Req() req: Request
  // ) {
  //   try {
  //     return await this.userService.updatePassword(newPasswordDto, req)
  //   } catch (error) {
  //     if (
  //       error instanceof UnidentifiedException ||
  //       error instanceof UnprocessableDataException
  //     ) {
  //       throw error.convert2HTTPException()
  //     }
  //     this.logger.error(error)
  //     throw new InternalServerErrorException('password reset failed')
  //   }
  // }

  @Post('sign-up')
  @AuthNotNeededIfOpenSpace()
  async signUp(@Body() signUpDto: SignUpDto, @Req() req: Request) {
    try {
      await this.userService.signUp(req, signUpDto)
    } catch (error) {
      if (
        error instanceof UnprocessableDataException ||
        error instanceof DuplicateFoundException ||
        error instanceof InvalidJwtTokenException
      ) {
        throw error.convert2HTTPException()
      }
      this.logger.error(error)
      throw new InternalServerErrorException()
    }
  }

  @Delete()
  async deleteUser(
    @Req() req: AuthenticatedRequest,
    @Body() deleteUserDto: DeleteUserDto
  ) {
    try {
      await this.userService.deleteUser(
        req.user.username,
        deleteUserDto.password
      )
    } catch (error) {
      if (
        error instanceof UnidentifiedException ||
        error instanceof ConflictFoundException
      ) {
        throw error.convert2HTTPException()
      } else if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.name === 'RecordNotFound'
      ) {
        throw new UnauthorizedException(error.message)
      }
      this.logger.error(error)
      throw new InternalServerErrorException()
    }
  }

  @Get('username-check')
  @AuthNotNeededIfOpenSpace()
  async checkDuplicatedUsername(@Query() usernameDto: UsernameDto) {
    try {
      return await this.userService.checkDuplicatedUsername(usernameDto)
    } catch (error) {
      if (error instanceof DuplicateFoundException) {
        throw error.convert2HTTPException()
      }
      this.logger.error(error)
      throw new InternalServerErrorException()
    }
  }
}
