import { Injectable } from '@nestjs/common'
import { PrismaService } from '@libs/prisma'
import type { ChangeArticleDto } from './dto/change-article.dto'
import type { CreateArticleDto } from './dto/create-article.dto'

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

  async createArticle(createArticleDto: CreateArticleDto) {
    // user -> author
    const { title, content, published, image } = createArticleDto
    const article = await this.prisma.article.create({
      data: {
        title,
        content,
        published,
        image
      }
    })

    return article
  }

  async changeArticle(changeArticleDto: ChangeArticleDto) {
    // user -> author
    const { title, content, published, image, id, mainId } = changeArticleDto
    const article = await this.prisma.article.update({
      where: {
        id
      },
      data: {
        title,
        content,
        published,
        image,
        mainId
      }
    })

    return article
  }

  async deleteArticle(id: number) {
    const article = await this.prisma.article.delete({
      where: {
        id
      }
    })

    return article
  }
}
