import { baseUrl } from '@/lib/constants'
import Image from 'next/image'
import Photo from '@/public/1.png'
interface Props {
  title: String,
  content: String
}

export default function NoticeDetail({title, content}: Props) {
  return (
    <article className="w-full relative py-6">
      <p className="pb-3">
        <h1 className="break-words text-2xl whitespace-nowrap overflow-hidden overflow-ellipsis lg:text-lg font-semibold">{title}</h1>
      </p>
      <div className="flex relative">
        <p className="prose flex lg:max-h-20 lg:text-sm lg:overflow-hidden lg:overflow-ellipsis">
          <h1> {content} </h1>
        </p>
        <div className="relative ml-3 w-36 h-28 flex-shrink-0">
          <Image
            src={Photo}
            className="img-fluid main-news-img-pc"
            fill={true}
            alt='Article image'
          >
          </Image>
        </div>
      </div>

    </article>
  )
}
