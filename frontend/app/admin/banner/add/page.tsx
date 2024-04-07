'use client'

import { Button } from '@/components/ui/button'
import { adminFetcherWithAuth } from '@/lib/utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useRef } from 'react'
import { toast } from 'sonner'

export default function PostBanner() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const imgRef = useRef<HTMLInputElement>(null)
  const [imgUrl, setImgUrl] = useState<string>('')

  const imgReset = () => {
    if (imgRef.current) {
      imgRef.current.value = ''
      //객체 URL 메모리 누수방지
      URL.revokeObjectURL(imgUrl)
      setImgUrl('')
    }
  }
  interface ImageRes {
    location: string
  }
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (
      imgRef.current &&
      imgRef.current.files &&
      imgRef.current.files.length > 0
    ) {
      const formData = new FormData()
      formData.append('file', imgRef.current.files[0])
      const imageRes: ImageRes = await adminFetcherWithAuth
        .post('s3/upload', {
          body: formData
        })
        .json()

      imgReset()
      setLoading(true)
      console.log(imageRes)
      const res = await adminFetcherWithAuth.post('banner', {
        json: {
          image: imageRes.location
        },
        next: {
          revalidate: 0
        }
      })
      if (res.ok) {
        toast.success('배너 업로드 완료')
        router.push('/admin/banner')
      } else {
        toast.error('배너 업로드 실패, 다시 시도해주세요')
      }
      setLoading(false)
      console.log(res)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      encType="multipart/form-data"
    >
      <label>메인 이미지 선택 </label>
      <input
        type="file"
        name="cardImg"
        ref={imgRef}
        id="card-img--input"
        onChange={(e: React.ChangeEvent<{ files: FileList | null }>) => {
          if (e.target.files && e.target.files.length > 0) {
            //객체 URL 메모리 누수방지
            const file = e.target.files[0]
            URL.revokeObjectURL(imgUrl)
            //URL생성
            setImgUrl(() => URL.createObjectURL(file))
          }
        }}
      ></input>
      <Button type="button" onClick={imgReset}>
        삭제하기
      </Button>
      {imgUrl && (
        <>
          <div>
            <Image src={imgUrl} alt="preview" width={200} height={300} />
          </div>
        </>
      )}
      <Button
        type="submit"
        disabled={loading}
        className="w-full rounded-md border border-indigo-500 bg-indigo-500 px-3 py-2 text-white focus:border-indigo-300 focus:outline-none focus:ring focus:ring-indigo-100 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-gray-500 dark:focus:ring-gray-900"
      >
        {loading ? 'Posting...' : 'Post Banner'}
      </Button>
    </form>
  )
}
