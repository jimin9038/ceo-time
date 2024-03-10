import { IsBoolean, IsString } from 'class-validator'

// model Article {
//   id              Int               @id @default(autoincrement())
//   title           String
//   content         String?
//   published       Boolean?          @default(false)
//   author          User?             @relation(fields: [authorId], references: [id])
//   authorId        Int?
//   createdAt       DateTime          @default(now())
//   updatedAt       DateTime          @updatedAt
//   ArticleCategory ArticleCategory[]
// }
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
