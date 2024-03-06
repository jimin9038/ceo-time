'use client'
import React, { useState } from 'react';
import { Button } from './button';
import NavLink from './NavLink';
import Link from 'next/link'
import Image from 'next/image';
import Logo from '@/public/logo.png';
import { cn } from '@/lib/utils';

export default function Header() {
  return (
    <header className="max-w-6xl border-b-gray grid h-16 w-full place-items-center border-b bg-white">
      <div className={"flex w-full max-w-7xl items-center justify-between gap-5 navbar"}>
        <div className="flex w-1/2 min-w-fit items-center justify-between gap-8 pr-20">
          <Link href="/">
            <Image src={Logo} alt="코드당" width={180} className='min-w-40' />
          </Link>
          <nav className="gap-5 capitalize flex whitespace-nowrap">
            <NavLink href="/articles/ceo" text="CEO" />
            <NavLink href="/articles/c-level" text="C-LEVEL" />
            <NavLink href="/articles/view" text="VIEW" />
            <NavLink href="/articles/focus" text="FOCUS" />
            <NavLink href="/articles/time" text="TIME" />
            <NavLink href="/articles/innovation" text="INNOVATION" />
            <NavLink href="/articles/management" text="MANAGEMENT" />
            <NavLink href="/articles/review" text="REVIEW" />
            <NavLink href="/articles/special-report" text="SPECIAL REPORT" />
            <NavLink href="/articles/vivid" text="VIVID" />
            <NavLink href="/articles/life" text="LIFE" />
          </nav>
        </div>
      </div>
    </header>
  )
}

