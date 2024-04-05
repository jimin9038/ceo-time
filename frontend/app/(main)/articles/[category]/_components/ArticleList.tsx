/* eslint-disable @next/next/no-img-element */
import type { Article } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'

export default function ArticleList({ article }: { article: Article }) {
  return (
    <Link href={`/article/${article?.id ?? '0'}`}>
      <article className="flex w-full py-6">
        <div className="relative mr-4 h-32 w-48 flex-shrink-0">
          <Image
            src={article.image}
            fill={true}
            alt="bannerimg"
            className="object-cover"
          ></Image>
        </div>
        <div className="pb-3">
          <h1 className="h-16 overflow-hidden overflow-ellipsis break-words text-xl font-semibold lg:text-lg">
            {article.title}
          </h1>
          <div className="prose line-clamp-3 max-h-20 overflow-hidden overflow-ellipsis lg:text-sm">
            <h1> {article.content} </h1>
          </div>
        </div>
      </article>
    </Link>
  )
}
