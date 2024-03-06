'use client'

export default function Footer() {
  return (
    <footer className="mt-8 flex h-[100px] w-full items-center justify-center bg-gray-50 md:h-[125px] md:items-end">
      <div className="flex w-full max-w-7xl flex-col justify-center gap-1 p-5 text-gray-400 md:flex-row md:justify-between md:gap-3">
        <p className="text-center text-sm font-bold">
          <h1>(c) CEOTIME / Since 2010 </h1>
        </p>
        <div className="flex items-center justify-center gap-4">
          s
        </div>
      </div>
    </footer>
  )
}

export { Footer }
