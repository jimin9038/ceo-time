import { Injectable } from '@nestjs/common'
import { PrismaService } from '@libs/prisma'
import type { ChangeCategoryDto } from './dto/change-category.dto'
import type { CreateCategoryDto } from './dto/create-category.dto'

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getCategoryByID(id: number) {
    return await this.prisma.category.findUniqueOrThrow({
      where: {
        id
      }
    })
  }

  async getCategorys({
    take,
    cursor
  }: {
    take: number
    cursor: number | null
  }) {
    const paginator = this.prisma.getPaginator(cursor)

    const categorys = await this.prisma.category.findMany({
      ...paginator,
      take,
      orderBy: { id: 'desc' }
    })

    return categorys
  }

  async createCategory(createCategoryDto: CreateCategoryDto) {
    const { name } = createCategoryDto
    const category = await this.prisma.category.create({
      data: {
        name
      }
    })

    return category
  }

  async changeCategory(changeCategoryDto: ChangeCategoryDto) {
    const { name, id } = changeCategoryDto
    const category = await this.prisma.category.update({
      where: {
        id
      },
      data: {
        name
      }
    })

    return category
  }

  async deleteCategory(id: number) {
    const category = await this.prisma.category.delete({
      where: {
        id
      }
    })

    return category
  }
}
