import BigArticle from '@/components/ui/BigArticle'
import BigBanner from '@/components/ui/BigBanner'
import MiddleArticle from '@/components/ui/MiddleArticle'
import SmallArticle from '@/components/ui/SmallArticle'
import SmallBanner from '@/components/ui/SmallBanner'
import type { Article, Banner } from '@/lib/types'
import { fetcher } from '@/lib/utils'

enum BannerMainId {
  No,
  Big1,
  Big2,
  Big3,
  Big4,
  Sub1,
  Sub2,
  Sub3,
  Sub4,
  Sub5,
  Sub6
}
export default async function Home() {
  const mainArticles: Article[] = await fetcher
    .get('article', {
      searchParams: {
        main: true
      },
      next: {
        tags: ['article']
      },
      cache: 'no-cache'
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

  const secondSectionArticles: Article[] = await fetcher
    .get('article', {
      searchParams: {
        category: 7
      },
      next: {
        tags: ['article']
      },
      cache: 'no-cache'
    })
    .json()

  const thirdSectionArticles: Article[] = await fetcher
    .get('article', {
      searchParams: {
        category: 1
      },
      next: {
        tags: ['article']
      },
      cache: 'no-cache'
    })
    .json()

  const forthSectionArticles: Article[] = await fetcher
    .get('article', {
      searchParams: {
        category: 10
      },
      next: {
        tags: ['article']
      },
      cache: 'no-cache'
    })
    .json()

  const forthSectionArticles2: Article[] = await fetcher
    .get('article', {
      searchParams: {
        category: 11
      },
      next: {
        tags: ['article']
      },
      cache: 'no-cache'
    })
    .json()

  const Big1Banner: Banner = await fetcher
    .get('banner/main', {
      searchParams: {
        mainId: BannerMainId.Big1
      },
      next: {
        tags: ['banner']
      },
      cache: 'no-cache'
    })
    .json()
  const Big2Banner: Banner = await fetcher
    .get('banner/main', {
      searchParams: {
        mainId: BannerMainId.Big2
      },
      next: {
        tags: ['banner']
      },
      cache: 'no-cache'
    })
    .json()
  const Big3Banner: Banner = await fetcher
    .get('banner/main', {
      searchParams: {
        mainId: BannerMainId.Big3
      },
      next: {
        tags: ['banner']
      },
      cache: 'no-cache'
    })
    .json()
  // const Big4Banner: Banner = await fetcher
  //   .get('banner', {
  //     searchParams: {
  //       mainId: BannerMainId.Big4
  //     }
  //   })
  //   .json()
  const Sub1Banner: Banner = await fetcher
    .get('banner/main', {
      searchParams: {
        mainId: BannerMainId.Sub1
      },
      next: {
        tags: ['banner']
      },
      cache: 'no-cache'
    })
    .json()
  const Sub2Banner: Banner = await fetcher
    .get('banner/main', {
      searchParams: {
        mainId: BannerMainId.Sub2
      },
      next: {
        tags: ['banner']
      },
      cache: 'no-cache'
    })
    .json()
  const Sub3Banner: Banner = await fetcher
    .get('banner/main', {
      searchParams: {
        mainId: BannerMainId.Sub3
      },
      next: {
        tags: ['banner']
      },
      cache: 'no-cache'
    })
    .json()
  const Sub4Banner: Banner = await fetcher
    .get('banner/main', {
      searchParams: {
        mainId: BannerMainId.Sub4
      },
      next: {
        tags: ['banner']
      },
      cache: 'no-cache'
    })
    .json()
  const Sub5Banner: Banner = await fetcher
    .get('banner/main', {
      searchParams: {
        mainId: BannerMainId.Sub5
      },
      next: {
        tags: ['banner']
      },
      cache: 'no-cache'
    })
    .json()
  // const Sub6Banner: Banner = await fetcher
  //   .get('banner', {
  //     searchParams: {
  //       mainId: BannerMainId.Sub6
  //     }
  //   })
  //   .json()
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
          <SmallArticle article={secondSectionArticles[0]}></SmallArticle>
          <SmallArticle article={secondSectionArticles[1]}></SmallArticle>
        </div>
        <div className="h-30 w-full border-r-2 border-r-gray-100 md:w-1/2 lg:w-1/3 lg:px-6">
          <SmallArticle article={secondSectionArticles[2]}></SmallArticle>
          <SmallArticle article={secondSectionArticles[3]}></SmallArticle>
        </div>
        <div className="h-30 w-full md:w-1/2 lg:w-1/3 lg:pl-6">
          <BigBanner banner={Big1Banner}></BigBanner>
        </div>
      </section>
      <section className="flex w-full max-w-6xl flex-col border-b-2 border-r-gray-500 lg:flex-row">
        <div className="h-30 w-full md:w-1/2 lg:w-1/3 lg:pr-6 ">
          <SmallBanner banner={Sub1Banner}></SmallBanner>
        </div>
        <div className="h-30 w-full md:w-1/2 lg:w-1/3 lg:px-6">
          <SmallBanner banner={Sub2Banner}></SmallBanner>
        </div>
        <div className="h-30 w-full md:w-1/2 lg:w-1/3 lg:pl-6">
          <SmallBanner banner={Sub3Banner}></SmallBanner>
        </div>
      </section>
      <section className="flex w-full max-w-6xl flex-col border-b-2 border-r-gray-500 lg:flex-row">
        <div className="h-30 w-full md:w-1/2 lg:pr-6">
          <MiddleArticle article={thirdSectionArticles[0]}></MiddleArticle>
          <MiddleArticle article={thirdSectionArticles[1]}></MiddleArticle>
        </div>
        <div className="h-30 w-full md:w-1/2 lg:pl-6">
          <MiddleArticle article={thirdSectionArticles[2]}></MiddleArticle>
          <MiddleArticle article={thirdSectionArticles[3]}></MiddleArticle>
        </div>
      </section>
      <section className="flex w-full max-w-6xl flex-col border-b-2 border-r-gray-500 lg:flex-row">
        <div className="h-30 w-full md:w-1/2 lg:pr-6">
          <MiddleArticle article={forthSectionArticles[0]}></MiddleArticle>
          <MiddleArticle article={forthSectionArticles[1]}></MiddleArticle>
        </div>
        <div className="h-30 w-full md:w-1/2 lg:pl-6">
          <MiddleArticle article={forthSectionArticles2[0]}></MiddleArticle>
          <MiddleArticle article={forthSectionArticles2[1]}></MiddleArticle>
        </div>
      </section>
      <section className="flex w-full max-w-6xl flex-col border-b-2 border-r-gray-500 lg:flex-row">
        <div className="h-30 w-full md:w-1/2 lg:w-1/3 lg:pr-6 ">
          <BigBanner banner={Big2Banner}></BigBanner>
        </div>
        <div className="h-30 w-full md:w-1/2 lg:w-1/3 lg:px-6">
          <BigBanner banner={Big3Banner}></BigBanner>
        </div>
        <div className="h-30 w-full md:w-1/2 lg:w-1/3 lg:pl-6">
          <SmallBanner banner={Sub4Banner}></SmallBanner>
          <SmallBanner banner={Sub5Banner}></SmallBanner>
        </div>
      </section>
    </div>
  )
}
