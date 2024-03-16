/* eslint-disable @typescript-eslint/naming-convention */
export interface Article {
  id: number
  title: string
  content: string
  published: boolean
  author: string
  createdAt: string
  updatedAt: string
  ArticleCategory: string[]
  image: string
  mainId: number
  imageContent: string
}
