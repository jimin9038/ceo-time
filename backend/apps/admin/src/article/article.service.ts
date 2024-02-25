import { Injectable } from '@nestjs/common'
import type { Prisma } from '@prisma/client'
import { PrismaService } from '@libs/prisma'

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
    published: boolean
  }) {
    const { take, cursor, orderBy, category, published } = params
    const articles = await this.prisma.article.findMany({
      skip: 1,
      take,
      cursor: cursor
        ? {
            id: cursor
          }
        : null,
      orderBy,
      where: {
        published,
        ArticleCategory: {
          every: {
            categoryId: { in: category }
          }
        }
      }
    })

    return articles
  }
}
