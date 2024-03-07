'use client'

import { Button } from '@/components/ui/button'
import useSignUpModalStore from '@/stores/signUpModal'

export default function SignUpWelcome() {
  const { nextModal } = useSignUpModalStore((state) => state)
  return (
    <div className="flex flex-col gap-3">
      <p className="text-center text-xl font-semibold text-blue-500">
        &quot;Welcome to CODEDANG&quot;
      </p>
      <Button className="w-full" onClick={() => nextModal()}>
        Sign up with Email
      </Button>
    </div>
  )
}
