import { Injectable } from '@nestjs/common'
import { PrismaService } from '@libs/prisma'
import type { ChangeBannerDto } from './dto/change-banner.dto'
import type { CreateBannerDto } from './dto/create-banner.dto'

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

  async createBanner(createBannerDto: CreateBannerDto) {
    const { image } = createBannerDto
    const banner = await this.prisma.banner.create({
      data: {
        image
      }
    })

    return banner
  }

  async changeBanner(changeBannerDto: ChangeBannerDto) {
    const { image, id, mainId } = changeBannerDto
    const banner = await this.prisma.banner.update({
      where: {
        id
      },
      data: {
        image,
        mainId
      }
    })

    return banner
  }

  async deleteBanner(id: number) {
    const banner = await this.prisma.banner.delete({
      where: {
        id
      }
    })

    return banner
  }
}
