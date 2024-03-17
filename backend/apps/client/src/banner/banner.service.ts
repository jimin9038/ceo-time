import { Injectable } from '@nestjs/common'
import { PrismaService } from '@libs/prisma'

@Injectable()
export class BannerService {
  constructor(private prisma: PrismaService) {}

  async getBannerByID(id: number) {
    return await this.prisma.banner.findUniqueOrThrow({
      where: {
        id
      }
    })
  }

  async getBannerByMainID(mainId: number) {
    return await this.prisma.banner.findFirst({
      where: {
        mainId
      }
    })
  }

  async getBanners({ take, cursor }: { take: number; cursor: number | null }) {
    const paginator = this.prisma.getPaginator(cursor)

    const banners = await this.prisma.banner.findMany({
      ...paginator,
      take,
      orderBy: { id: 'desc' }
    })

    return banners
  }
}
