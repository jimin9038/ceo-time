'use client'

import { useEffect, useRef } from 'react'

function AutoResizeTextarea({ content }: { content: string }) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const textArea = textAreaRef.current
    const setHeight = () => {
      if (textArea) {
        textArea.style.height = 'auto'
        textArea.style.height = `${textArea.scrollHeight}px`
      }
    }
    setHeight()
    if (textArea) {
      textArea.addEventListener('input', setHeight)
    }
    return () => {
      if (textArea) {
        textArea.removeEventListener('input', setHeight)
      }
    }
  }, [])

  return (
    <textarea
      ref={textAreaRef}
      className="mx-auto w-11/12 resize-none border-none caret-transparent outline-none"
    >
      {content}
    </textarea>
  )
}

export default AutoResizeTextarea
