import { Module } from '@nestjs/common'
import { RolesModule } from '@libs/auth'
import { ArticleService } from './article.service'
import { ArticleController } from './article.controller'
@Module({
  imports: [RolesModule],
  providers: [ArticleService, ArticleController]
})
export class ArticleModule {}
