'use client'

import { Button } from '@/components/ui/button'
import { adminFetcherWithAuth } from '@/lib/utils'
import { useState } from 'react'

export const dynamic = 'force-dynamic'

export default function Page() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const title = ''
  const content = ''
  const category = ''
  const submit = async () => {
    setLoading(true)
    const res = await adminFetcherWithAuth.post('article', {
      json: {
        title,
        content,
        category
      },
      next: {
        revalidate: 0
      }
    })
    if (res.ok) setSubmitted(true)
    setLoading(false)
  }

  return (
    <div>
      <Button
        className="h-7 shrink-0 rounded-md px-2"
        disabled={loading}
        onClick={submit}
      ></Button>
      <input title={title} />
      <input content={content} />
      {submitted}
    </div>
  )
}
