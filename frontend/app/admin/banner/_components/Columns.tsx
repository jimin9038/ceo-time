'use client'

import { adminFetcherWithAuth } from '@/lib/utils'
import type { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import { toast } from 'sonner'

const handleChange = async (
  e: React.ChangeEvent<HTMLSelectElement>,
  bannerId: number
) => {
  e.preventDefault()
  const res = await adminFetcherWithAuth.put('banner', {
    json: {
      id: bannerId,
      mainId: Number(e.target.value)
    }
  })
  if (res.ok) {
    toast.success('배너 변경 완료')
  } else {
    toast.error('배너 변경 실패! 다시 시도해주세요')
  }
}
interface Banner {
  id: number
  image: string
  mainId: number
  link: string
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
          <option value={1}>Big 1</option>
          <option value={2}>Big 2</option>
          <option value={3}>Big 3</option>
          <option value={4}>Big 4</option>
          <option value={5}>Sub 1</option>
          <option value={6}>Sub 2</option>
          <option value={7}>Sub 3</option>
          <option value={8}>Sub 4</option>
          <option value={9}>Sub 5</option>
          <option value={10}>Sub 6</option>
        </select>
      )
    }
  },
  {
    header: '이미지 URL',
    accessorKey: 'image',
    cell: ({ row }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <Image
        src={row.original.image}
        width={200}
        height={200}
        alt="bannerimg"
      ></Image>
    )
  },
  {
    header: '링크',
    accessorKey: 'link',
    cell: ({ row }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <a href={row.original.link}>{row.original.link ?? 'No Link'}</a>
    )
  }
]
