/* eslint-disable @next/next/no-img-element */
import type { Article } from '@/lib/types'
import { fetcher } from '@/lib/utils'
import ArticleList from './_components/ArticleList'

export default async function ArticleDetail({
  params
}: {
  params: {
    category: number
  }
}) {
  const { category } = params
  const articles: Article[] = await fetcher
    .get('article', {
      searchParams: {
        take: '200',
        category
      },
      next: {
        tags: ['article']
      },
      cache: 'no-cache'
    })
    .json()
  return (
    <div className="relative max-w-6xl">
      {articles.map((article) => {
        return <ArticleList key={article.id} article={article}></ArticleList>
      })}
    </div>
  )
}
