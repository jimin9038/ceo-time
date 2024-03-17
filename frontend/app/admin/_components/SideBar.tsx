'use client'

import { cn } from '@/lib/utils'
import type { Route } from 'next'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { IconType } from 'react-icons'
import { FaChartBar, FaPen, FaBell } from 'react-icons/fa6'

export default function Page() {
  const pathname = usePathname()

  const navItems: { name: string; path: Route; icon: IconType }[] = [
    { name: 'Dashboard', path: '/admin', icon: FaChartBar },
    { name: 'Article', path: '/admin/article', icon: FaPen },
    { name: 'Add article', path: '/admin/article/add', icon: FaPen },
    { name: 'Banner', path: '/admin/banner', icon: FaBell },
    { name: 'Add Banner', path: '/admin/banner/add', icon: FaPen }
  ]

  return (
    <div className="flex flex-col gap-2">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.path}
          className={cn(
            'rounded px-4 py-2 transition',
            (
              item.path === '/admin'
                ? pathname === item.path
                : pathname.startsWith(item.path)
            )
              ? 'bg-primary text-black hover:opacity-95'
              : 'text-slate-600 hover:bg-slate-100'
          )}
        >
          {item.icon && <item.icon className="mr-2 inline-block" />}
          {item.name}
        </Link>
      ))}
    </div>
  )
}
