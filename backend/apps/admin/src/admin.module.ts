import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AdminController } from './admin.controller'
import { AdminService } from './admin.service'
import { ArticleModule } from './article/article.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [ConfigModule.forRoot(), UserModule, ArticleModule],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
