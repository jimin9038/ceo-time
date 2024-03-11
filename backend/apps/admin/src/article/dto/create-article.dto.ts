import { IsBoolean, IsString } from 'class-validator'

export class CreateArticleDto {
  @IsString()
  title: string

  @IsString()
  content: string

  @IsBoolean()
  published: boolean

  @IsString()
  articleCategory: string

  @IsString()
  image: string
}
