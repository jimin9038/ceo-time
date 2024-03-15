import { IsString } from 'class-validator'

export class CreateBannerDto {
  @IsString()
  image: string
}
