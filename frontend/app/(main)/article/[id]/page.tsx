import type { Article } from '@/lib/types'
import { fetcher } from '@/lib/utils'
import dayjs from 'dayjs'
import Image from 'next/image'
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
    <div className="w-full max-w-6xl">
      <div className="flex w-full flex-col lg:flex-row">
        <div className="lg:w-4/5 lg:border-r-2 lg:border-slate-100">
          <h1 className="mb-10 mt-20 w-11/12 text-3xl">{article.title}</h1>
          <div className="relative mx-auto h-96 w-full lg:w-4/5">
            <Image
              src={article.image}
              alt={article.title}
              className="object-scale-down"
              fill={true}
            />
          </div>

          <p className="mx-auto mb-20 w-full text-slate-500 lg:w-4/5 lg:text-sm">
            {article.imageContent}
          </p>
          <AutoResizeTextarea content={article.content}></AutoResizeTextarea>
          <p className="mb-20 mr-10 text-left text-slate-500">
            {dayjs(article.createdAt).format('입력 YYYY. MM. DD. HH:mm A')}
          </p>
        </div>
        <div className="my-10 lg:m-5 lg:w-1/5">
          <p className="font-base mb-4 text-xl">인기 있는 콘텐츠</p>
          <p className="font-light">준비 중입니다.</p>
        </div>
      </div>
    </div>
  )
}
