'use client'

import DataTable from '@/components/DataTable'
import type { Article } from '@/lib/types'
import { adminFetcherWithAuth } from '@/lib/utils'
import { useState, useEffect } from 'react'
import { columns } from './Columns'

// interface Props {
//   search: string
// }

export default function ArticleTable() {
  const [articles, setArticles] = useState([] as Article[])
  async function getArticle() {
    const res: Article[] = await adminFetcherWithAuth
      .get('article', {
        searchParams: {
          take: '200',
          category: '0'
        }
      })
      .json()
    return setArticles(res)
  }
  useEffect(() => {
    getArticle()
  }, [])
  const currentPageData = articles
  return (
    <DataTable
      data={currentPageData}
      columns={columns}
      headerStyle={{
        id: 'w-1/12',
        title: 'text-left w-3/12',
        author: 'w-1/12',
        published: 'w-1/12',
        createTime: 'w-1/12',
        category: 'w-1/12',
        image: 'w-1/12',
        mainId: 'w-1/12',
        delete: 'w-1/12'
      }}
    />
  )
}
