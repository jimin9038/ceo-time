import Photo from '@/public/1.png'
import Image from 'next/image'

interface Props {
  title: string
  content: string
}

export default function MiddleArticle({ title, content }: Props) {
  return (
    <article className="relative w-full py-6">
      <p className="pb-3">
        <h1 className="overflow-hidden overflow-ellipsis whitespace-nowrap break-words text-2xl font-semibold lg:text-lg">
          {title}
        </h1>
      </p>
      <div className="relative flex">
        <p className="prose flex lg:max-h-20 lg:overflow-hidden lg:overflow-ellipsis lg:text-sm">
          <h1> {content} </h1>
        </p>
        <div className="relative ml-3 h-28 w-36 flex-shrink-0">
          <Image
            src={Photo}
            className="img-fluid main-news-img-pc"
            fill={true}
            alt="Article image"
            objectFit="cover"
          ></Image>
        </div>
      </div>
    </article>
  )
}
