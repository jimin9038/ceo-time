'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import CodedangLogo from '@/public/logo.png'
import useAuthModalStore from '@/stores/authModal'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface Inputs {
  username: string
  password: string
}

export default function SignIn() {
  const [disableButton, setDisableButton] = useState(false)
  const { showSignUp } = useAuthModalStore((state) => state)
  const router = useRouter()
  const { register, handleSubmit } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setDisableButton(true)
    try {
      const res = await signIn('credentials', {
        username: data.username,
        password: data.password,
        redirect: false
      })

      if (!res?.error) {
        router.refresh()
        toast.success(`Welcome back, ${data.username}!`)
      } else {
        toast.error('Failed to log in')
      }
    } catch (error) {
      console.error('Error during login:', error)
      toast.error('An unexpected error occurred')
    } finally {
      setDisableButton(false)
    }
  }
  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="flex justify-center pt-4">
        <Image src={CodedangLogo} alt="코드당" height={64} />
      </div>
      <div className="flex flex-col gap-4">
        <form
          className="flex w-full flex-col gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input placeholder="User ID" type="text" {...register('username')} />
          <Input
            placeholder="Password"
            type="password"
            {...register('password')}
          />
          <Button className="w-full" type="submit" disabled={disableButton}>
            Log In
          </Button>
        </form>
      </div>
      <div className="flex items-center justify-between">
        <Button
          onClick={() => showSignUp()}
          variant={'link'}
          className="h-5 w-fit p-0 py-2 text-xs text-gray-500"
        >
          Sign Up
        </Button>
        <Button
          variant={'link'}
          className="h-5 w-fit p-0 py-2 text-xs text-gray-500"
        >
          Forgot ID/Password?
        </Button>
      </div>
    </div>
  )
}
