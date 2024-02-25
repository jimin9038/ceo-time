import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard, JwtAuthModule, RolesModule } from '@libs/auth'
import { CacheConfigService } from '@libs/cache'
import { PrismaModule } from '@libs/prisma'
import { AdminController } from './admin.controller'
import { AdminService } from './admin.service'
import { ArticleModule } from './article/article.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useClass: CacheConfigService
    }),
    ConfigModule.forRoot(),
    CacheModule.registerAsync({
      isGlobal: true,
      useClass: CacheConfigService
    }),
    JwtAuthModule,
    RolesModule,
    PrismaModule,
    UserModule,
    ArticleModule
  ],
  controllers: [AdminController],
  providers: [AdminService, { provide: APP_GUARD, useClass: JwtAuthGuard }]
})
export class AdminModule {}
