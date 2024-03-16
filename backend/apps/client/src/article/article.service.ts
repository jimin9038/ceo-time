import { Injectable } from '@nestjs/common'
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

  async getArticles({
    take,
    cursor,
    category
  }: {
    take: number
    cursor: number | null
    category: Array<number>
  }) {
    const paginator = this.prisma.getPaginator(cursor)

    const articles = await this.prisma.article.findMany({
      ...paginator,
      take,
      where:
        category.length > 0
          ? {
              ArticleCategory: {
                every: {
                  categoryId: { in: category }
                }
              }
            }
          : undefined,
      orderBy: { id: 'desc' }
    })

    return articles
  }
}
