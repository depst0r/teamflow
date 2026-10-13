import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import AddTaskForm from "./components/addTaskForm"
import TaskItem from "./components/taskItem"

export const dynamic = 'force-dynamic'

export default async function Home() {

  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')
  

  const { data: tasks } = await supabase.from('tasks').select('*')

return (
  <>
  <AddTaskForm />
    <main className="p-8 flex flex-col items-center">
    {tasks && tasks.map(task => (
  <TaskItem key={task.id} task={task} />
  ))}
  
    </main>
  </>
)
}