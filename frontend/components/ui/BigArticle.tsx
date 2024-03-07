import Photo from '@/public/1.png'
import Image from 'next/image'

interface Props {
  title: string
  content: string
}

export default function NoticeDetail({ title, content }: Props) {
  return (
    <article className="relative w-full">
      <div className="relative flex w-full pb-96">
        <Image
          src={Photo}
          className="object-cover"
          fill={true}
          alt="Article image"
        ></Image>
      </div>
      <p className="py-4">
        <h1 className="break-words text-3xl font-semibold lg:overflow-hidden lg:overflow-ellipsis lg:whitespace-nowrap">
          {title}
        </h1>
      </p>
      <p className="prose w-full max-w-full overflow-ellipsis py-4">
        <h1> {content} </h1>
      </p>
    </article>
  )
}
