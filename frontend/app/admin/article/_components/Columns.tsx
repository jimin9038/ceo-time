'use client'

import { cn } from '@/lib/utils'
import type { ColumnDef } from '@tanstack/react-table'
import dayjs from 'dayjs'

interface Article {
  id: number
  title: string
  content: string
  published: boolean
  author: string
  createdAt: string
  updatedAt: string
  ArticleCategory: string[]
  image: string
}

export const columns: ColumnDef<Article>[] = [
  {
    header: '제목',
    accessorKey: 'title',
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-start gap-3 md:gap-4">
          <span
            className={cn(
              'overflow-hidden text-ellipsis whitespace-nowrap text-sm md:text-base'
            )}
          >
            {row.original.title}
          </span>
        </div>
      )
    }
  },
  {
    header: '글쓴이',
    accessorKey: 'createdBy',
    cell: ({ row }) => row.original.author
  },
  {
    header: '공개',
    accessorKey: 'published',
    cell: ({ row }) => (row.original.published ? '공개' : '비공개')
  },
  {
    header: '생성 날짜',
    accessorKey: 'createTime',
    cell: ({ row }) => dayjs(row.original.createdAt).format('YYYY-MM-DD')
  },
  {
    header: '이미지 URL',
    accessorKey: 'image',
    cell: ({ row }) => row.original.image
  }
]
