import { Skeleton } from '@/components/ui/skeleton'
import { Suspense } from 'react'
import BannerTable from './_components/BannerTable'

export default function Banner() {
  return (
    <div>
      <Suspense
        fallback={
          <>
            <div className="mt-4 flex">
              <span className="w-2/4 md:w-4/6">
                <Skeleton className="h-6 w-20" />
              </span>
              <span className="w-1/4 md:w-1/6">
                <Skeleton className="mx-auto h-6 w-20" />
              </span>
              <span className="w-1/4 md:w-1/6">
                <Skeleton className="mx-auto h-6 w-20" />
              </span>
            </div>
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="my-2 flex h-12 w-full rounded-xl" />
            ))}
          </>
        }
      >
        <BannerTable />
      </Suspense>
    </div>
  )
}
