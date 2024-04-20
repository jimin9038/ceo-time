import { IsOptional, IsString } from 'class-validator'

export class CreateBannerDto {
  @IsString()
  image: string

  @IsOptional()
  link: string
}
