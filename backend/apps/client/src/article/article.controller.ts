import {
  Controller,
  DefaultValuePipe,
  ParseArrayPipe,
  ParseBoolPipe,
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
import { ArticleService } from './article.service'

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

@Controller('article')
export class ArticleController {
  private readonly logger = new Logger(ArticleController.name)

  constructor(private readonly articleService: ArticleService) {}

  @AuthNotNeededIfOpenSpace()
  @Get()
  async getArticles(
    @Query(
      'category',
      new DefaultValuePipe([]),
      new ParseArrayPipe({ items: ParseIntPipe })
    )
    category: Array<number>,
    @Query('published', new DefaultValuePipe(true), ParseBoolPipe)
    published: boolean,
    @Query('cursor', ParseIntPipe) cursor: number | null,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number
  ) {
    try {
      return await this.articleService.getArticles({
        category,
        published,
        cursor,
        take
      })
    } catch (error) {
      this.logger.error(error) 
      throw new InternalServerErrorException()
    }
  }

  @AuthNotNeededIfOpenSpace()
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
}
