import { Module } from '@nestjs/common'
import { RolesModule } from '@libs/auth'
import { ArticleController, UploadController } from './article.controller'
import { ArticleService } from './article.service'

@Module({
  imports: [RolesModule],
  controllers: [ArticleController, UploadController],
  providers: [ArticleService]
})
export class ArticleModule {}
