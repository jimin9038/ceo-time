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
import { AuthenticatedRequest, UseRolesGuard } from '@libs/auth'
import { ArticleService } from './article.service'
import { ChangeArticleDto } from './dto/change-article.dto'
import { CreateArticleDto } from './dto/create-article.dto'

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

@UseRolesGuard('Admin')
@Controller('article')
export class ArticleController {
  private readonly logger = new Logger(ArticleController.name)

  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async getArticles(
    @Query('category', new DefaultValuePipe(0), ParseIntPipe)
    category: number,
    @Query('cursor', CursorValidationPipe)
    cursor: number | null,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number
  ) {
    try {
      return await this.articleService.getArticles({
        cursor,
        take,
        category
      })
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException()
    }
  }

  @Get(':id')
  async getArticleByID(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.articleService.getArticleByID(id)
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
  async createArticle(
    @Req() req: AuthenticatedRequest,
    @Body() createArticleDto: CreateArticleDto
  ) {
    await this.articleService.createArticle(createArticleDto)
  }

  @Put()
  async changeArticle(
    @Req() req: AuthenticatedRequest,
    @Body() changeArticleDto: ChangeArticleDto
  ) {
    try {
      await this.articleService.changeArticle(changeArticleDto)
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
  async deleteArticle(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.articleService.deleteArticle(id)
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

@UseRolesGuard('Admin')
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
