import Logo from '@/public/ceotime-logo-black.jpg'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="mt-8 flex h-[20rem] w-full items-center justify-center bg-slate-950">
      {/* <div className="relative ml-5 h-24 w-1/3">
        <Image
          src={Logo}
          fill={true}
          alt="Article image"
          className="object-cover"
        ></Image>
      </div> */}
      <div>
        <p className="mb-5 text-center text-2xl text-white">
          CEO TIME, The Magazine for Leaders
        </p>
        <p className="text-center text-sm text-white">
          Email : jin9038 at daum.net
          <br />
          Website : www.ceotime.co.kr
          <br />ⓒ CEO TIME. All rights reserved
        </p>
      </div>
    </footer>
  )
}

export { Footer }
