import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard, JwtAuthModule } from '@libs/auth'
import { CacheConfigService } from '@libs/cache'
import { PrismaModule } from '@libs/prisma'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ArticleModule } from './article/article.module'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.registerAsync({
      isGlobal: true,
      useClass: CacheConfigService
    }),
    JwtAuthModule,
    PrismaModule,
    AuthModule,
    UserModule,
    AuthModule,
    ArticleModule
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }]
})
export class AppModule {}
