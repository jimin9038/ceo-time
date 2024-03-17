import {
  Controller,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
  Injectable,
  type PipeTransform,
  BadRequestException,
  Get,
  Logger,
  InternalServerErrorException,
  Param,
  NotFoundException
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { AuthNotNeededIfOpenSpace } from '@libs/auth'
import { BannerService } from './banner.service'

@Injectable()
export class CursorValidationPipe implements PipeTransform {
  transform(value: unknown) {
    if (value == null) {
      return null
    } else if (typeof value === 'string') {
      const cursor = parseInt(value)
      if (cursor > 0) {
        return cursor
      }
    }
    throw new BadRequestException('Cursor must be a positive number')
  }
}
// @UseRolesGuard('Admin')
@AuthNotNeededIfOpenSpace()
@Controller('banner')
export class BannerController {
  private readonly logger = new Logger(BannerController.name)

  constructor(private readonly bannerService: BannerService) {}

  @Get()
  async getBanners(
    @Query('cursor', CursorValidationPipe)
    cursor: number | null,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number
  ) {
    try {
      return await this.bannerService.getBanners({
        cursor,
        take
      })
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException()
    }
  }

  @Get('id/:id')
  async getBannerByID(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.bannerService.getBannerByID(id)
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.name === 'NotFoundError'
      ) {
        throw new NotFoundException(error.message)
      }
      this.logger.error(error)
      throw new InternalServerErrorException()
    }
  }

  @Get('main')
  async getBannerByMainID(@Query('mainId', ParseIntPipe) mainId: number) {
    try {
      return await this.bannerService.getBannerByMainID(mainId)
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.name === 'NotFoundError'
      ) {
        throw new NotFoundException(error.message)
      }
      this.logger.error(error)
      throw new InternalServerErrorException()
    }
  }
}
