export const dynamic = 'force-dynamic'
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import AddTaskForm from "./components/addTaskForm"

export default async function Home() {

  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')
  

  const { data: tasks } = await supabase.from('tasks').select('*')



return (
  <>
  <AddTaskForm />
  <main className="p-8">
    {tasks && tasks.map(task => (
      <div key={task.id}>
        <h3>{task.title}</h3>
      </div>
    ))}
  </main>
  </>
)
}