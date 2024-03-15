'use client'

import { adminFetcherWithAuth } from '@/lib/utils'
import type { ColumnDef } from '@tanstack/react-table'
import dayjs from 'dayjs'

const handleChange = (
  e: React.ChangeEvent<HTMLSelectElement>,
  bannerId: number
) => {
  e.preventDefault()
  adminFetcherWithAuth.put('banner', {
    json: {
      id: bannerId,
      mainId: Number(e.target.value)
    }
  })
}
interface Banner {
  id: number
  image: string
  mainId: number
}

export const columns: ColumnDef<Banner>[] = [
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
    header: '이미지 URL',
    accessorKey: 'image',
    cell: ({ row }) => row.original.image
  }
]
