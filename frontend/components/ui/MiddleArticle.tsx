import type { Article } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'

export default function MiddleArticle({ article }: { article: Article }) {
  return (
    <Link href={`/article/${article?.id}`}>
      <article className="relative w-full py-6">
        <div className="pb-3">
          <h1 className="overflow-hidden overflow-ellipsis whitespace-nowrap break-words text-2xl font-semibold lg:text-lg">
            {article?.title}
          </h1>
        </div>
        <div className="relative flex">
          <div className="overflow-hidden overflow-ellipsis lg:text-sm ">
            <h1 className="line-clamp-5"> {article?.content} </h1>
          </div>
          <div className="relative ml-3 h-28 w-36 flex-shrink-0">
            <Image
              src={article?.image}
              className="object-cover"
              fill={true}
              alt="Article image"
            ></Image>
          </div>
        </div>
      </article>
    </Link>
  )
}
