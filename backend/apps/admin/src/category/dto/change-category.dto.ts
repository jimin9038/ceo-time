import { IsNumber, IsString } from 'class-validator'

export class ChangeCategoryDto {
  @IsNumber()
  id: number

  @IsString()
  name: string
}
