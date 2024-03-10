import { Injectable } from '@nestjs/common'
import type { Prisma } from '@prisma/client'
import { AuthNotNeededIfOpenSpace } from '@libs/auth'
import { PrismaService } from '@libs/prisma'
import { CreateArticleDto } from './dto/create-article.dto'

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  async getArticleByID(id: number) {
    return await this.prisma.article.findUniqueOrThrow({
      where: {
        id,
        published: true
      }
    })
  }

  async getArticles(params: {
    take: number
    cursor: number | null
    orderBy?: Prisma.ArticleOrderByWithRelationInput
    category: Array<number>
  }) {
    const { take, cursor, orderBy, category } = params
    const articles = await this.prisma.article.findMany({
      skip: 1,
      take,
      cursor: cursor
        ? {
            id: cursor
          }
        : null,
      orderBy,
      where:
        category.length > 0
          ? {
              ArticleCategory: {
                every: {
                  categoryId: { in: category }
                }
              }
            }
          : undefined
    })

    return articles
  }

  @AuthNotNeededIfOpenSpace()
  async createArticle(createArticleDto: CreateArticleDto) {
    // user -> author
    const { title, content, published } = createArticleDto
    const article = await this.prisma.article.create({
      data: {
        title,
        content,
        published
      }
    })

    return article
  }
}
