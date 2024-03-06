import { baseUrl } from '@/lib/constants'
import Image from 'next/image'
import Photo from '@/public/1.png'
interface Props {
  title: String,
  content: String
}

export default function SmallBanner() {
  return (
    <article className="w-full relative py-6">
      <div className="flex relative">
        <div className="relative w-full h-80 flex-shrink-0">
          <Image
            src={Photo}
            className="img-fluid main-news-img-pc"
            fill={true}
            alt='Article image'
            objectFit='cover'
          >
          </Image>
        </div>
      </div>

    </article>
  )
}
