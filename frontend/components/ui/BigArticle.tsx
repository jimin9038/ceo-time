import { baseUrl } from '@/lib/constants'

interface NoticeDetailProps {
  params: {
    id: string
  }
}

export default async function NoticeDetail({ params }: NoticeDetailProps) {
  const { id } = params
  const {
    current: { title, content }
  } = await fetch(baseUrl + `/notice/${id}`).then((res) => res.json())
  return (
    <article>
      <header className="border-b border-b-gray-200 p-5 py-4">
        <h2 className="break-words text-lg font-semibold">{title}</h2>
      </header>
      <main
        className="prose w-full max-w-full p-5 py-12"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  )
}
