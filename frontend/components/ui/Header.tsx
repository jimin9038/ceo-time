// import { cn } from '@/lib/utils'
import Logo from '@/public/logo.png'
import Image from 'next/image'
import Link from 'next/link'
// import React, { useState } from 'react'
import NavLink from './NavLink'

// import { Button } from './button'

export default async function Header() {
  const today = new Date()
  return (
    <header className="border-b-gray grid h-16 w-full max-w-6xl place-items-center border-b bg-white">
      <div
        className={
          'navbar flex w-full max-w-7xl items-center justify-between gap-5'
        }
      >
        <div className="flex w-1/2 min-w-fit items-center justify-between gap-8 pr-20">
          <Link href="/">
            <Image src={Logo} alt="CEO TIME" width={180} className="min-w-40" />
          </Link>
          <nav className="flex gap-5 whitespace-nowrap capitalize">
            <NavLink href="/articles/1" text="CEO" />
            <NavLink href="/articles/2" text="C-LEVEL" />
            <NavLink href="/articles/3" text="VIEW" />
            <NavLink href="/articles/4" text="FOCUS" />
            <NavLink href="/articles/5" text="TIME" />
            <NavLink href="/articles/6" text="INNOVATION" />
            <NavLink href="/articles/7" text="MANAGEMENT" />
            <NavLink href="/articles/8" text="REVIEW" />
            <NavLink href="/articles/9" text="SPECIAL REPORT" />
            <NavLink href="/articles/10" text="VIVID" />
            <NavLink href="/articles/11" text="LIFE" />
          </nav>
          <div className="whitespace-nowrap">
            {today.toLocaleDateString('ko-KR')}
          </div>
        </div>
      </div>
    </header>
  )
}
