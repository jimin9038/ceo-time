/* eslint-disable @next/next/no-img-element */
import type { Article } from '@/lib/types'
import { fetcher } from '@/lib/utils'
import ArticleList from './_components/ArticleList'

export default async function ArticleDetail({
  params
}: {
  params: {
    category: string
  }
}) {
  const { category } = params
  const articles: Article[] = await fetcher
    .get('article', {
      searchParams: {
        take: '200',
        category
      }
    })
    .json()
  return (
    <div className="relative">
      {articles.map((article) => {
        return <ArticleList key={article.id} article={article}></ArticleList>
      })}
    </div>
  )
}
