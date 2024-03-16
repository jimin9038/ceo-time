import type { Article } from '@/lib/types'
import Image from 'next/image'

export default function SmallArticle({ article }: { article: Article }) {
  return (
    <article className="relative w-full py-6">
      <div className="pb-3">
        <h1 className="h-14 overflow-hidden overflow-ellipsis break-words text-xl font-semibold lg:text-lg">
          {article.title}
        </h1>
      </div>
      <div className="relative flex">
        <div className="relative mr-3 h-20 w-32 flex-shrink-0">
          <Image
            src={article.image}
            className="object-cover"
            fill={true}
            alt="Article image"
          ></Image>
        </div>
        <div className="prose flex lg:max-h-16 lg:overflow-hidden lg:overflow-ellipsis lg:text-sm">
          <h1> {article.content} </h1>
        </div>
      </div>
    </article>
  )
}
