import { Module } from '@nestjs/common'
import { RolesModule } from '@libs/auth'
import { BannerController } from './banner.controller'
import { BannerService } from './banner.service'

@Module({
  imports: [RolesModule],
  controllers: [BannerController],
  providers: [BannerService]
})
export class BannerModule {}
