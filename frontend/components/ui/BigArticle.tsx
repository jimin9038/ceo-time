import type { Article } from '@/lib/types'
import Image from 'next/image'

export default function BigArticle({ article }: { article: Article }) {
  return (
    <article className="relative w-full">
      <div className="relative flex w-full pb-96">
        <Image
          src={article.image}
          className="object-cover"
          fill={true}
          alt="Article image"
        ></Image>
      </div>
      <div className="py-4">
        <h1 className="break-words text-3xl font-semibold lg:overflow-hidden lg:overflow-ellipsis lg:whitespace-nowrap">
          {article.title}
        </h1>
      </div>
      <div className="line-clamp-4 w-full max-w-full overflow-hidden overflow-ellipsis">
        <h1> {article.content} </h1>
      </div>
    </article>
  )
}
