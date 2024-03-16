'use client'

import { Button } from '@/components/ui/button'
import { adminFetcherWithAuth } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

export default function PostCategory() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    const res = await adminFetcherWithAuth.post('category', {
      json: {
        name
      }
    })
    if (res.ok) {
      router.push('/admin/category')
    } else {
      toast.error('Failed to post category')
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-300 focus:border-indigo-300 focus:outline-none focus:ring focus:ring-indigo-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-gray-500 dark:focus:ring-gray-900"
        placeholder="Name"
      />
      <Button
        type="submit"
        disabled={loading}
        className="w-full rounded-md border border-indigo-500 bg-indigo-500 px-3 py-2 text-white focus:border-indigo-300 focus:outline-none focus:ring focus:ring-indigo-100 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-gray-500 dark:focus:ring-gray-900"
      >
        {loading ? 'Posting...' : 'Post Category'}
      </Button>
    </form>
  )
}
