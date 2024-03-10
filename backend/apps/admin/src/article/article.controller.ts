import {
  Controller,
  DefaultValuePipe,
  ParseArrayPipe,
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
  Res
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Prisma } from '@prisma/client'
import { Request, Response } from 'express'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { AuthNotNeededIfOpenSpace, AuthenticatedRequest } from '@libs/auth'
import { ArticleService } from './article.service'
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
// @UseRolesGuard('Admin')
@AuthNotNeededIfOpenSpace()
@Controller('article')
export class ArticleController {
  private readonly logger = new Logger(ArticleController.name)

  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async getArticles(
    @Query(
      'category',
      new DefaultValuePipe([]),
      new ParseArrayPipe({ items: ParseIntPipe })
    )
    category: Array<number>,
    @Query('cursor', ParseIntPipe) cursor: number | null,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number
  ) {
    try {
      return await this.articleService.getArticles({
        cursor,
        take,
        category: []
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
  @Get(':ids')
  async getArticleByIDs(@Param('id', ParseIntPipe) id: number) {
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

  @AuthNotNeededIfOpenSpace()
  @Post()
  async createArticle(
    @Req() req: AuthenticatedRequest,
    @Body() createArticleDto: CreateArticleDto
  ) {
    await this.articleService.createArticle(createArticleDto)
  }
}

@AuthNotNeededIfOpenSpace()
@Controller('uploads')
export class UploadController {
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename(_, file, callback): void {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('')
          return callback(null, `${randomName}${extname(file.originalname)}`)
        }
      })
    })
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      url: `/uploads/${file.filename}`
    }
  }

  @Get('/:filename')
  async getImage(@Req() req: Request, @Res() res: Response) {
    const filename = req.file.filename // 이미지 파일명
    const imageUrl = `http://localhost:5000/api/uploads/${filename}` // 이미지 url

    // 이미지 url을 res.locals 객체에 저장
    res.locals.imageUrl = imageUrl
    return res
  }
}
