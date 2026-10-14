import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import AddTaskForm from "./components/addTaskForm"
import TaskItem from "./components/taskItem"
import FilterBar from "./components/filterBar"

export const dynamic = 'force-dynamic'

export default async function Home({searchParams}: { searchParams: Promise<{status?: string}> }) {

  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  const { status } = await searchParams

  if (!user) redirect('/login')
  

  let query = supabase.from('tasks').select('*')

  if (status) {
    query = query.eq('status', status)
  }

  const { data: tasks } = await query

return (
  <>
  <AddTaskForm />
  <FilterBar/>
    <main className="p-8 flex flex-col items-center">
    {tasks && tasks.map(task => (
  <TaskItem key={task.id} task={task} />
  ))}
  
    </main>
  </>
)
}