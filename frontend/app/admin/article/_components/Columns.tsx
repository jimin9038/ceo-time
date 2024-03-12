'use client'

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
    header: 'ID',
    accessorKey: 'id',
    cell: ({ row }) => {
      return (
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-left text-sm md:text-base">{`${row.original.id}`}</p>
      )
    }
  },
  {
    header: '제목',
    accessorKey: 'title',
    cell: ({ row }) => {
      return (
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-left text-sm md:text-base">{`${row.original.title}`}</p>
      )
    }
  },
  {
    header: '글쓴이',
    accessorKey: 'author',
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
