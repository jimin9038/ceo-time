import { baseUrl } from '@/lib/constants'
import Image from 'next/image'
import Photo from '@/public/1.png'
interface Props {
  title: String,
  content: String
}

export default function SmallArticle({title, content}: Props) {
  return (
    <article className="w-full relative py-6">
      <p className="pb-3">
        <h1 className="break-words text-xl h-14 overflow-hidden overflow-ellipsis lg:text-lg font-semibold">{title}</h1>
      </p>
      <div className="flex relative">
        <div className="relative mr-3 w-32 h-20 flex-shrink-0">
          <Image
            src={Photo}
            className="img-fluid main-news-img-pc"
            fill={true}
            alt='Article image'
            objectFit='cover'
          >
          </Image>
        </div>
        <p className="prose flex lg:max-h-16 lg:text-sm lg:overflow-hidden lg:overflow-ellipsis">
          <h1> {content} </h1>
        </p>
      </div>

    </article>
  )
}
