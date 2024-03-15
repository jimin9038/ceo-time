'use client'

import DataTable from '@/components/DataTable'
import { adminFetcherWithAuth } from '@/lib/utils'
import { useState, useEffect } from 'react'
import { columns } from './Columns'

// interface Props {
//   search: string
// }

interface Banner {
  id: number
  image: string
  mainId: number
}

export default function BannerTable() {
  const [banners, setBanners] = useState([] as Banner[])
  async function getBanner() {
    const res: Banner[] = await adminFetcherWithAuth
      .get('banner', {
        searchParams: {
          take: '100',
          category: '[]'
        }
      })
      .json()
    return setBanners(res)
  }
  useEffect(() => {
    getBanner()
  }, [])
  const currentPageData = banners

  return (
    <DataTable
      data={currentPageData}
      columns={columns}
      headerStyle={{
        id: 'w-1/7',
        title: 'text-left w-2/7 md:w-2/7',
        author: 'w-1/7',
        published: 'w-1/7',
        createTime: 'w-1/7',
        image: 'w-1/7',
        mainId: 'w-1/7'
      }}
    />
  )
}
