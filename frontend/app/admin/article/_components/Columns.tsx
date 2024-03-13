'use client'

import { adminFetcherWithAuth } from '@/lib/utils'
import type { ColumnDef } from '@tanstack/react-table'
import dayjs from 'dayjs'

const handleChange = (
  e: React.ChangeEvent<HTMLSelectElement>,
  articleId: number
) => {
  e.preventDefault()
  adminFetcherWithAuth.put('article', {
    json: {
      id: articleId,
      mainId: e.target.value
    }
  })
}
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
  mainId: number
}

export const columns: ColumnDef<Article>[] = [
  {
    header: 'ID',
    accessorKey: 'id',
    cell: ({ row }) => {
      return (
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm md:text-base">{`${row.original.id}`}</p>
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
    header: '메인 ID',
    accessorKey: 'mainId',
    cell: ({ row }) => {
      return (
        <select
          className="w-full rounded-md border border-gray-300 p-2 text-sm"
          defaultValue={row.original.mainId}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
            handleChange(event, row.original.id)
          }
        >
          <option value={1}>main</option>
          <option value={2}>sub1</option>
          <option value={3}>sub2</option>
          <option value={4}>sub3</option>
        </select>
      )
    }
  },
  {
    header: '이미지 URL',
    accessorKey: 'image',
    cell: ({ row }) => row.original.image
  }
]
