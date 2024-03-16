import BigArticle from '@/components/ui/BigArticle'
import BigBanner from '@/components/ui/BigBanner'
import MiddleArticle from '@/components/ui/MiddleArticle'
import SmallArticle from '@/components/ui/SmallArticle'
import SmallBanner from '@/components/ui/SmallBanner'

export default function Home() {
  const title =
    '“차세대 수출동력 강화 위해 지속적으로 현장의견에 귀 기울일 것” '
  const content =
    '윤진식 한국무역협회(KITA) 회장은 6일 경기도 판교 테크노밸리에 위치한 반도체 테스트 장비 전문 기업 엑시콘(대표 최명배)을 방문하며 취임 후 첫 무역업계 현장소통 행보에 나섰다.'
  return (
    <div>
      <section className="flex w-full max-w-6xl flex-col border-b-2 border-r-gray-500 lg:flex-row">
        <div className="h-30 mt-6 w-full border-r-2 border-r-gray-100 lg:w-2/3 lg:pr-6">
          <BigArticle title={title} content={content}></BigArticle>
        </div>
        <div className="h-30 w-full overflow-hidden lg:ml-6 lg:w-1/3">
          <MiddleArticle title={title} content={content}></MiddleArticle>
          <MiddleArticle title={title} content={content}></MiddleArticle>
          <MiddleArticle title={title} content={content}></MiddleArticle>
        </div>
      </section>
      <section className="flex w-full max-w-6xl flex-col border-b-2 border-r-gray-500 lg:flex-row">
        <div className="h-30 w-full border-r-2 border-r-gray-100 md:w-1/2 lg:w-1/3 lg:pr-6">
          <SmallArticle title={title} content={content}></SmallArticle>
          <SmallArticle title={title} content={content}></SmallArticle>
        </div>
        <div className="h-30 w-full border-r-2 border-r-gray-100 md:w-1/2 lg:w-1/3 lg:px-6">
          <SmallArticle title={title} content={content}></SmallArticle>
          <SmallArticle title={title} content={content}></SmallArticle>
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
          <MiddleArticle title={title} content={content}></MiddleArticle>
          <MiddleArticle title={title} content={content}></MiddleArticle>
        </div>
        <div className="h-30 w-full md:w-1/2 lg:pl-6">
          <MiddleArticle title={title} content={content}></MiddleArticle>
          <MiddleArticle title={title} content={content}></MiddleArticle>
        </div>
      </section>
      <section className="flex w-full max-w-6xl flex-col border-b-2 border-r-gray-500 lg:flex-row">
        <div className="h-30 w-full md:w-1/2 lg:pr-6">
          <MiddleArticle title={title} content={content}></MiddleArticle>
          <MiddleArticle title={title} content={content}></MiddleArticle>
        </div>
        <div className="h-30 w-full md:w-1/2 lg:pl-6">
          <MiddleArticle title={title} content={content}></MiddleArticle>
          <MiddleArticle title={title} content={content}></MiddleArticle>
        </div>
      </section>
    </div>
  )
}
