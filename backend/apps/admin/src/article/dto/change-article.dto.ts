import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class ChangeArticleDto {
  @IsOptional()
  @IsString()
  title: string

  @IsOptional()
  @IsString()
  content: string

  @IsOptional()
  @IsBoolean()
  published: boolean

  @IsOptional()
  @IsString()
  articleCategory: string

  @IsOptional()
  @IsString()
  image: string

  @IsNumber()
  id: number

  @IsOptional()
  @IsNumber()
  mainId: number
}
