import HeaderAuthPanel from '@/components/auth/HeaderAuthPanel'
import { auth } from '@/lib/auth'

export default async function Admin() {
  const session = await auth()
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-3 ">
      <HeaderAuthPanel session={session} />
    </main>
  )
}
