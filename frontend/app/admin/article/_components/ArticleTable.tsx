import DataTable from '@/components/DataTable'
import { adminFetcherWithAuth } from '@/lib/utils'
import { columns } from './Columns'

interface Props {
  search: string
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
}
// eslint-disable-next-line @next/next/no-async-client-component
export default async function ArticleTable({ search }: Props) {
  // const fixedArticles: Article[] =
  //   search !== ''
  //     ? []
  //     : await adminFetcherWithAuth
  //         .get('article', {
  //           searchParams: {
  //             fixed: 'true',
  //             take: '10'
  //           }
  //         })
  //         .json()

  const articles: Article[] = await adminFetcherWithAuth
    .get('article', {
      searchParams: {
        search: '',
        take: '10',
        category: '[]',
        cursor: '10'
      }
    })
    .json()
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
