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
  NotFoundException,
  Post,
  Body,
  Req,
  UseInterceptors,
  UploadedFile,
  Put,
  Delete
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Prisma } from '@prisma/client'
import { AuthNotNeededIfOpenSpace, AuthenticatedRequest } from '@libs/auth'
import { BannerService } from './banner.service'
import { ChangeBannerDto } from './dto/change-banner.dto'
import { CreateBannerDto } from './dto/create-banner.dto'

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

  @Get(':id')
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

  @Post()
  async createBanner(
    @Req() req: AuthenticatedRequest,
    @Body() createBannerDto: CreateBannerDto
  ) {
    await this.bannerService.createBanner(createBannerDto)
  }

  @Put()
  async changeBanner(
    @Req() req: AuthenticatedRequest,
    @Body() changeBannerDto: ChangeBannerDto
  ) {
    try {
      await this.bannerService.changeBanner(changeBannerDto)
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

  @Delete(':id')
  async deleteBanner(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.bannerService.deleteBanner(id)
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

@AuthNotNeededIfOpenSpace()
@Controller('s3')
export class S3StorageController {
  constructor() {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile()
    file: Express.Multer.File
  ) {
    return file
  }
}
