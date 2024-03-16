import BigArticle from '@/components/ui/BigArticle'
import BigBanner from '@/components/ui/BigBanner'
import MiddleArticle from '@/components/ui/MiddleArticle'
import SmallArticle from '@/components/ui/SmallArticle'
import SmallBanner from '@/components/ui/SmallBanner'
import type { Article } from '@/lib/types'
import { fetcher } from '@/lib/utils'

export default async function Home() {
  const mainArticles: Article[] = await fetcher
    .get('article', {
      searchParams: {
        main: true
      }
    })
    .json()
  const mainArticle: Article = mainArticles.find((article) => {
    return article.mainId === 1
  })!

  const subArticles: Article[] = mainArticles.filter((article) => {
    return article.mainId > 1
  })

  const middleArticles = subArticles.map((subArticle) => {
    return (
      <MiddleArticle key={subArticle.id} article={subArticle}></MiddleArticle>
    )
  })

  return (
    <div>
      <section className="flex w-full max-w-6xl flex-col border-b-2 border-r-gray-500 lg:flex-row">
        <div className="h-30 mt-6 w-full border-r-2 border-r-gray-100 lg:w-2/3 lg:pr-6">
          <BigArticle article={mainArticle}></BigArticle>
        </div>
        <div className="h-30 w-full overflow-hidden lg:ml-6 lg:w-1/3">
          {middleArticles}
        </div>
      </section>
      <section className="flex w-full max-w-6xl flex-col border-b-2 border-r-gray-500 lg:flex-row">
        <div className="h-30 w-full border-r-2 border-r-gray-100 md:w-1/2 lg:w-1/3 lg:pr-6">
          <SmallArticle article={mainArticle}></SmallArticle>
          <SmallArticle article={mainArticle}></SmallArticle>
        </div>
        <div className="h-30 w-full border-r-2 border-r-gray-100 md:w-1/2 lg:w-1/3 lg:px-6">
          <SmallArticle article={mainArticle}></SmallArticle>
          <SmallArticle article={mainArticle}></SmallArticle>
        </div>
        <div className="h-30 w-full md:w-1/2 lg:w-1/3 lg:pl-6">
          <BigBanner></BigBanner>
        </div>
      </section>
      <section className="flex w-full max-w-6xl flex-col border-b-2 border-r-gray-500 lg:flex-row">
        <div className="h-30 w-full md:w-1/2 lg:w-1/3 lg:pr-6 ">
          <SmallBanner></SmallBanner>
        </div>
        <div className="h-30 w-full md:w-1/2 lg:w-1/3 lg:px-6">
          <SmallBanner></SmallBanner>
        </div>
        <div className="h-30 w-full md:w-1/2 lg:w-1/3 lg:pl-6">
          <SmallBanner></SmallBanner>
        </div>
      </section>
      <section className="flex w-full max-w-6xl flex-col border-b-2 border-r-gray-500 lg:flex-row">
        <div className="h-30 w-full md:w-1/2 lg:pr-6">
          <MiddleArticle article={mainArticle}></MiddleArticle>
          <MiddleArticle article={mainArticle}></MiddleArticle>
        </div>
        <div className="h-30 w-full md:w-1/2 lg:pl-6">
          <MiddleArticle article={mainArticle}></MiddleArticle>
          <MiddleArticle article={mainArticle}></MiddleArticle>
        </div>
      </section>
      <section className="flex w-full max-w-6xl flex-col border-b-2 border-r-gray-500 lg:flex-row">
        <div className="h-30 w-full md:w-1/2 lg:pr-6">
          <MiddleArticle article={mainArticle}></MiddleArticle>
          <MiddleArticle article={mainArticle}></MiddleArticle>
        </div>
        <div className="h-30 w-full md:w-1/2 lg:pl-6">
          <MiddleArticle article={mainArticle}></MiddleArticle>
          <MiddleArticle article={mainArticle}></MiddleArticle>
        </div>
      </section>
    </div>
  )
}
