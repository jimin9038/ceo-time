'use client'

import DataTable from '@/components/DataTable'
import { adminFetcherWithAuth } from '@/lib/utils'
import { useState, useEffect } from 'react'
import { columns } from './Columns'

// interface Props {
//   search: string
// }

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

export default function ArticleTable() {
  const [articles, setArticles] = useState([] as Article[])
  async function getArticle() {
    const res: Article[] = await adminFetcherWithAuth
      .get('article', {
        searchParams: {
          take: '200',
          category: '[]'
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
        title: 'text-left w-2/4 md:w-4/6',
        createdBy: 'w-1/4 md:w-1/6',
        createTime: 'w-1/4 md:w-1/6'
      }}
      linked
    />
  )
}
