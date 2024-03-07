// import { baseUrl } from '@/lib/constants'
import Photo from '@/public/sk-innovation.jpg'
import Image from 'next/image'

// interface Props {
//   title: string
//   content: string
// }

export default function SmallBanner() {
  return (
    <article className="relative w-full py-6">
      <div className="relative flex">
        <div className="relative mr-3 h-28 w-full flex-shrink-0">
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
