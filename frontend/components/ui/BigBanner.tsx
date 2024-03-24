import type { Banner } from '@/lib/types'
import Image from 'next/image'

export default function BigBanner({ banner }: { banner: Banner }) {
  return (
    <article className="relative w-full py-6">
      <div className="relative flex">
        <div className="relative h-80 w-full flex-shrink-0">
          <Image
            src={banner?.image}
            className="object-contain"
            fill={true}
            alt="Banner image"
          ></Image>
        </div>
      </div>
    </article>
  )
}
