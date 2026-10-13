'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

type Props = {
    task: { id: string; title: string; status: string }
}

export default function TaskItem({task} : Props) {

    const router = useRouter()

    const toggleStatus  = async () => {
        const next = nextStatus[task.status]
        const supabase = createClient()
        await supabase.from('tasks').update({ status: next }).eq('id', task.id)
        router.refresh()
    }

    const nextStatus: Record<string, string> = {
        todo: 'in_progress',
        in_progress: 'done',
        done: 'todo',
        }

    const statusText: Record<string, string> = {
        todo: 'К выполнению',
        in_progress: 'В работе',
        done: 'Готово',
    }

    const statusColor: Record<string, string> = {
        todo: 'bg-slate-600',
        in_progress: 'bg-blue-600',
        done: 'bg-green-600',
}

return (
  <div
    onClick={toggleStatus}
    className="flex items-center justify-between gap-4 p-4 mb-2 w-full max-w-md bg-slate-800 rounded cursor-pointer hover:bg-slate-700"
  >
    <h3 className="text-lg">{task.title}</h3>
    <span className={`px-3 py-1 rounded text-sm text-white ${statusColor[task.status]}`}>
      {statusText[task.status]}
    </span>
  </div>
)
}