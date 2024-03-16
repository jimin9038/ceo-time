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
    category,
    main
  }: {
    take: number
    cursor: number | null
    category: Array<number>
    main: boolean
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
          : main
            ? { mainId: { gt: 0 } }
            : undefined,
      orderBy: { id: 'desc' }
    })

    return articles
  }
}
