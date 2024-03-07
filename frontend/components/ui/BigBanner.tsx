import Photo from '@/public/1.png'
import Image from 'next/image'

// interface Props {
//   title: string
//   content: string
// }

export default function SmallBanner() {
  return (
    <article className="relative w-full py-6">
      <div className="relative flex">
        <div className="relative h-80 w-full flex-shrink-0">
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
