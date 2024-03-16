'use client'

import DataTable from '@/components/DataTable'
import { adminFetcherWithAuth } from '@/lib/utils'
import { useState, useEffect } from 'react'
import { columns } from './Columns'

// interface Props {
//   search: string
// }

interface Category {
  id: number
  name: string
}

export default function CategoryTable() {
  const [categorys, setCategorys] = useState([] as Category[])
  async function getCategory() {
    const res: Category[] = await adminFetcherWithAuth
      .get('category', {
        searchParams: {
          take: '100'
        }
      })
      .json()
    return setCategorys(res)
  }
  useEffect(() => {
    getCategory()
  }, [])
  const currentPageData = categorys

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
