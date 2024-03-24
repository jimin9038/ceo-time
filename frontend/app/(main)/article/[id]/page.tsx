/* eslint-disable @next/next/no-img-element */
import type { Article } from '@/lib/types'
import { fetcher } from '@/lib/utils'
import AutoResizeTextarea from './_components/AutoResizeTextArea'

export default async function ArticleDetail({
  params
}: {
  params: {
    id: string
  }
}) {
  const { id } = params
  const article: Article = await fetcher
    .get(`article/${id}`, {
      next: {
        tags: ['article']
      },
      cache: 'no-cache'
    })
    .json()
  return (
    <div className="max-w-6xl">
      <div className="flex w-full max-w-6xl flex-col lg:flex-row">
        <div className="lg:w-4/5 lg:border-r-2 lg:border-slate-100">
          <h1 className="my-20 text-4xl font-bold">{article.title}</h1>
          <img
            className="mx-auto w-full lg:w-3/5"
            src={article.image}
            alt={article.title}
          />
          <p className="mx-auto mb-20 w-full text-slate-500 lg:w-3/5 lg:text-sm">
            {article.imageContent}
          </p>
          <AutoResizeTextarea content={article.content}></AutoResizeTextarea>
        </div>
        <div className="my-10 lg:m-5 lg:w-1/5">
          <p className="mb-4 text-xl font-bold">인기 있는 콘텐츠</p>
          <p>준비 중입니다.</p>
        </div>
      </div>
    </div>
  )
}
