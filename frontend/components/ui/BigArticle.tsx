import { baseUrl } from '@/lib/constants'
import Image from 'next/image'
import Photo from '@/public/1.png'
interface Props {
  title: String,
  content: String
}

export default function NoticeDetail({title, content}: Props) {
  return (
    <article className="w-full relative">
      <div className="pb-96 relative w-full flex">
        <Image
          src={Photo}
          className="img-fluid main-news-img-pc"
          fill={true}
          alt='Article image'
        >
        </Image>
      </div>
      <p className="py-4">
        <h1 className="break-words text-3xl font-semibold lg:whitespace-nowrap lg:overflow-hidden lg:overflow-ellipsis">{title}</h1>
      </p>
      <p className="border-b border-b-gray-200 py-4 prose w-full max-w-full overflow-ellipsis">
        <h1> {content} </h1>
      </p>
    </article>
  )
}
