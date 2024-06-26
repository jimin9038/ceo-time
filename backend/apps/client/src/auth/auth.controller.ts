import {
  Controller,
  Body,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  InternalServerErrorException,
  Logger
} from '@nestjs/common'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { Request, Response } from 'express'
import {
  AuthenticatedRequest,
  AuthNotNeededIfOpenSpace,
  type JwtTokens
} from '@libs/auth'
import { REFRESH_TOKEN_COOKIE_OPTIONS } from '@libs/constants'
import {
  InvalidJwtTokenException,
  UnidentifiedException
} from '@libs/exception'
import { AuthService } from './auth.service'
import { LoginUserDto } from './dto/login-user.dto'

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name)

  constructor(private readonly authService: AuthService) {}

  setJwtResponse = (res: Response, jwtTokens: JwtTokens) => {
    res.setHeader('authorization', `Bearer ${jwtTokens.accessToken}`)
    res.cookie(
      'refresh_token',
      jwtTokens.refreshToken,
      REFRESH_TOKEN_COOKIE_OPTIONS
    )
  }

  @AuthNotNeededIfOpenSpace()
  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    try {
      const jwtTokens = await this.authService.issueJwtTokens(loginUserDto)
      this.setJwtResponse(res, jwtTokens)
    } catch (error) {
      if (error instanceof UnidentifiedException) {
        throw error.convert2HTTPException()
      }
      this.logger.error(error)
      throw new InternalServerErrorException('Login failed')
    }
  }

  @Post('logout')
  async logout(
    @Req() req: AuthenticatedRequest,
    @Res({ passthrough: true }) res: Response
  ) {
    try {
      await this.authService.deleteRefreshToken(req.user.id)
      res.clearCookie('refresh_token', REFRESH_TOKEN_COOKIE_OPTIONS)
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException()
    }
  }

  @AuthNotNeededIfOpenSpace()
  @Get('reissue')
  async reIssueJwtTokens(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const refreshToken = req.cookies['refresh_token']
    if (!refreshToken) throw new UnauthorizedException('Invalid Token')

    try {
      const newJwtTokens = await this.authService.updateJwtTokens(refreshToken)
      this.setJwtResponse(res, newJwtTokens)
    } catch (error) {
      if (error instanceof InvalidJwtTokenException) {
        throw error.convert2HTTPException()
      }
      this.logger.error(error)
      throw new InternalServerErrorException('Failed to reissue tokens')
    }
  }
}
