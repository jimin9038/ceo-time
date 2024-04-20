import { IsNumber, IsOptional, IsString } from 'class-validator'

export class ChangeBannerDto {
  @IsOptional()
  @IsString()
  image: string

  @IsNumber()
  id: number

  @IsOptional()
  @IsNumber()
  mainId: number

  @IsOptional()
  @IsString()
  link: string
}
