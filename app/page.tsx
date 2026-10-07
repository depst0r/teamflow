import { createClient } from '@/lib/supabase/server'

export default async function Home() {
  const supabase = await createClient()
  
  const { data, error } = await supabase.from('_test').select('*')
  
  console.log('Supabase connected:', { data, error })
  
  return (
    <main className="p-8">
      <h1>TeamFlow</h1>
      <p>Supabase: {error ? `ошибка: ${error.message}` : 'подключено'}</p>
    </main>
  )
}