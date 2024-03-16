'use client'

import { Button } from '@/components/ui/button'
import { adminFetcherWithAuth } from '@/lib/utils'
import type { ColumnDef } from '@tanstack/react-table'
import { toast } from 'sonner'

// const handleChange = (
//   e: React.ChangeEvent<HTMLSelectElement>,
//   categoryId: number
// ) => {
//   e.preventDefault()
//   adminFetcherWithAuth.put('category', {
//     json: {
//       id: categoryId,
//       mainId: Number(e.target.value)
//     }
//   })
// }
const deleteCategory = (
  e: React.MouseEvent<HTMLButtonElement>,
  categoryId: number
) => {
  e.preventDefault()
  adminFetcherWithAuth.delete('category/' + categoryId).then((res) => {
    if (!res.ok) {
      toast.error('Failed to delete category')
    } else {
      window.location.reload()
    }
  })
}
interface Category {
  id: number
  name: string
}

export const columns: ColumnDef<Category>[] = [
  {
    header: 'ID',
    accessorKey: 'id',
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm md:text-base">{`${row.original.id}`}</p>
          <Button onClick={(e) => deleteCategory(e, row.original.id)}>
            Delete
          </Button>
        </div>
      )
    }
  },
  {
    header: '제목',
    accessorKey: 'name',
    cell: ({ row }) => {
      return (
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-left text-sm md:text-base">{`${row.original.name}`}</p>
      )
    }
  }
]
