import { Controller, Get } from '@nestjs/common'
import { ArticleService } from './article.service'

@Controller()
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  
}
