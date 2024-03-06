import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Header from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'
import BigArticle from '@/components/ui/BigArticle'
import MiddleArticle from '@/components/ui/MiddleArticle'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-3 ">
      <Header></Header>
      <section className="flex flex-col w-full lg:flex-row max-w-6xl">
        <div className="w-full lg:w-2/3 h-30 mt-6 lg:pr-6 border-r-2 border-r-gray-100">
          <BigArticle title="[단독] 신명품 라인업 강화한 신세계인터내셔날, ‘더 로우’ 독점 유통" content="[이코노미스트 이혜리 기자] 패션전문기업 신세계인터내셔날이 ‘MZ세대의 에르메스’로 불리는 ‘더 로우’(The Row)를 새로 론칭하며 신명품 브랜드 포트폴리오 다각화에 나선다. "></BigArticle>
        </div>
        <div className="w-full lg:w-1/3 h-30 lg:mx-6">
          <MiddleArticle title="[단독] 신명품 라인업 강화한 신세계인터내셔날, ㄴㄴㅇㄴㅇㅇㄹㄴㅇㄹ ‘더 로우’ 독점 유통" content="[이코노미스트 이혜리 기자] 패션전문기업 신세계인터내셔날이 ‘MZ세대의 에르메스’로 불리는 ‘더 로우’(The Row)를 새로 론칭하며 신명품 브랜드 포트폴리오 다각화에 나선다. "></MiddleArticle>
          <MiddleArticle title="[단독] 신명품 라인업 강화한 신세계인터내셔날, ‘더 로우’ 독점 유통" content="[이코노미스트 이혜리 기자] 패션전문기업 신세계인터내셔날이 ‘MZ세대의 에르메스’로 불리는 ‘더 로우’(The Row)를 새로 론칭하며 신명품 브랜드 포트폴리오 다각화에 나선다. "></MiddleArticle>
          <MiddleArticle title="[단독] 신명품 라인업 강화한 신세계인터내셔날, ‘더 로우’ 독점 유통" content="[이코노미스트 이혜리 기자] 패션전문기업 신세계인터내셔날이 ‘MZ세대의 에르메스’로 불리는 ‘더 로우’(The Row)를 새로 론칭하며 신명품 브랜드 포트폴리오 다각화에 나선다. "></MiddleArticle>
        </div>
      </section>

      <Footer></Footer>
    </main>
  )
}
