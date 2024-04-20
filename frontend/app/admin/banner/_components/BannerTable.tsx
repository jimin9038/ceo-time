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
  link: string
}

export default function BannerTable() {
  const [banners, setBanners] = useState([] as Banner[])
  async function getBanner() {
    const res: Banner[] = await adminFetcherWithAuth
      .get('banner', {
        searchParams: {
          take: '100'
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
        id: 'w-1/8',
        title: 'text-left w-2/8 md:w-2/8',
        author: 'w-1/8',
        published: 'w-1/8',
        createTime: 'w-1/8',
        image: 'w-1/8',
        mainId: 'w-1/8',
        link: 'w-1/8'
      }}
    />
  )
}
