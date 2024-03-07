// import Logo from '@/public/logo.png'
// import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="mt-8 flex h-[20rem] w-full items-center justify-center bg-slate-900">
      {/* <div className="w-1/3 h-24 relative">
        <Image
          src={Logo}
          fill={true}
          alt='Article image'
          objectFit='cover'
        >
        </Image>
      </div> */}
      <p className="text-center text-2xl font-bold text-white">
        CEO TIME<br></br>
        Since 2010<br></br>
        The magazine for Leaders
      </p>
    </footer>
  )
}

export { Footer }
