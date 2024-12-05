'use client'

import type { Article } from '@/lib/types'
import { adminFetcherWithAuth } from '@/lib/utils'
import type { ColumnDef } from '@tanstack/react-table'
import dayjs from 'dayjs'
import Image from 'next/image'
import { toast } from 'sonner'

const handleChange = (
  e: React.ChangeEvent<HTMLSelectElement>,
  articleId: number
) => {
  e.preventDefault()
  adminFetcherWithAuth
    .put('article', {
      json: {
        id: articleId,
        mainId: Number(e.target.value)
      }
    })
    .then((res) => {
      if (res.ok) {
        toast.success('메인 글 변경 성공')
      } else {
        toast.error('메인 글 변경 실패, 다시 시도해주세요')
      }
    })
}

const handleChangeCategory = (
  e: React.ChangeEvent<HTMLSelectElement>,
  articleId: number
) => {
  e.preventDefault()
  adminFetcherWithAuth
    .put('article', {
      json: {
        id: articleId,
        category: Number(e.target.value)
      }
    })
    .then((res) => {
      if (res.ok) {
        toast.success('카테고리 변경 성공')
      } else {
        toast.error('카테고리 변경 실패, 다시 시도해주세요')
      }
    })
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
          <option value={0}>No</option>
          <option value={1}>main</option>
          <option value={2}>sub1</option>
          <option value={3}>sub2</option>
          <option value={4}>sub3</option>
        </select>
      )
    }
  },
  {
    header: 'category',
    accessorKey: 'category',
    cell: ({ row }) => {
      return (
        <select
          className="w-full rounded-md border border-gray-300 p-2 text-sm"
          defaultValue={row.original.category}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
            handleChangeCategory(event, row.original.id)
          }
        >
          <option value={0}>No Category</option>
          <option value={12}>CEO&Leadership</option>
          <option value={1}>CEO</option>
          <option value={2}>C-LEVEL</option>
          <option value={3}>VIEW</option>
          <option value={4}>FOCUS</option>
          <option value={5}>TIME</option>
          <option value={6}>INNOVATION</option>
          <option value={7}>MANAGEMENT</option>
          <option value={8}>REVIEW</option>
          <option value={9}>SPECIAL REPORT</option>
          <option value={10}>VIVID</option>
          <option value={11}>LIFE</option>
        </select>
      )
    }
  },
  {
    header: '이미지 URL',
    accessorKey: 'image',
    cell: ({ row }) => (
      <Image src={row.original.image} width={200} height={200} alt="im"></Image>
    )
  },
  {
    header: '삭제',
    accessorKey: 'delete',
    cell: ({ row }) => {
      return (
        <button
          onClick={async () => {
            const res = await adminFetcherWithAuth.delete(
              `article/${row.original.id}`
            )
            if (res.ok) {
              toast.success('삭제 성공!')
            } else {
              toast.error('삭제 실패, 다시 시도해주세요!')
            }
            window.location.reload()
          }}
        >
          삭제
        </button>
      )
    }
  }
]
