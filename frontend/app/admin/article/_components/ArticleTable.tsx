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
  mainId: number
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
