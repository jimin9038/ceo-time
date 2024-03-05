import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Header from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-3">
      <Header></Header>
      <Footer></Footer>
    </main>
  )
}
