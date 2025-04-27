'use client'

// import { baseUrl } from '@/lib/constants'
import type { Banner } from '@/lib/types'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export default function SmallBanner({
  banner,
  className
}: {
  banner: Banner
  className?: string
}) {
  return (
    <article className="relative my-auto w-full py-6">
      <a href={banner?.link} className="relative w-full">
        <div
          className={cn(
            'relative mr-3 h-28 w-full flex-shrink-0 justify-center',
            className
          )}
        >
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
