// import { cn } from '@/lib/utils'
import HeaderAuthPanel from '@/components/auth/HeaderAuthPanel'
import { auth } from '@/lib/auth'
import Logo from '@/public/logo.png'
import type { Route } from 'next'
import Image from 'next/image'
import Link from 'next/link'
// import React, { useState } from 'react'
import NavLink from './NavLink'

// import { Button } from './button'

export default async function Header() {
  const session = await auth()
  return (
    <header className="border-b-gray grid h-16 w-full max-w-6xl place-items-center border-b bg-white">
      <div
        className={
          'navbar flex w-full max-w-7xl items-center justify-between gap-5'
        }
      >
        <div className="flex w-1/2 min-w-fit items-center justify-between gap-8 pr-20">
          <Link href="/">
            <Image src={Logo} alt="코드당" width={180} className="min-w-40" />
          </Link>
          <nav className="flex gap-5 whitespace-nowrap capitalize">
            <NavLink href="/" text="CEO" />
            <NavLink href="/" text="C-LEVEL" />
            <NavLink href="/" text="VIEW" />
            <NavLink href="/" text="FOCUS" />
            <NavLink href="/" text="TIME" />
            <NavLink href="/" text="INNOVATION" />
            <NavLink href="/" text="MANAGEMENT" />
            <NavLink href="/" text="REVIEW" />
            <NavLink href="/" text="SPECIAL REPORT" />
            <NavLink href="/" text="VIVID" />
            <NavLink href={'/articles/life' as Route} text="LIFE" />
          </nav>
        </div>
        <HeaderAuthPanel session={session} />
      </div>
    </header>
  )
}
