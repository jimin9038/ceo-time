import Footer from '@/components/ui/Footer'
import Header from '@/components/ui/Header'

export default function MainLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-start p-3 ">
        <Header></Header>
        {children}
      </main>
      <Footer></Footer>
    </div>
  )
}
