import { Module } from '@nestjs/common'
import { RolesModule } from '@libs/auth'
import { ArticleController } from './article.controller'
import { ArticleService } from './article.service'

@Module({
  imports: [RolesModule],
  providers: [ArticleService, ArticleController]
})
export class ArticleModule {}
