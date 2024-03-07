import Photo from '@/public/lh.png'
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
            className="object-cover"
            fill={true}
            alt="Article image"
          ></Image>
        </div>
      </div>
    </article>
  )
}
