// import { baseUrl } from '@/lib/constants'
import type { Banner } from '@/lib/types'
import Image from 'next/image'

export default function SmallBanner({ banner }: { banner: Banner }) {
  return (
    <article className="relative w-full py-6">
      <a href={banner?.link} className="relative flex">
        <div className="relative mr-3 h-28 w-full flex-shrink-0">
          <Image
            src={banner?.image}
            className="object-contain"
            fill={true}
            alt="Banner image"
          ></Image>
        </div>
      </a>
    </article>
  )
}
