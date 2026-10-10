'use client'
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

export default function AddTaskForm(){

    const [title, setTitle] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        const supabase = createClient()

        const { data: { user } } = await supabase.auth.getUser()

        const { error } = await supabase.from('tasks').insert({ title, user_id: user?.id })
        
        if (error) setError(error.message)
            
        setLoading(false)
        setTitle('')
    }

    return (
            <div className="bg-slate-900 text-zinc-100">
                <form 
                    className="flex flex-col gap-4 w-full max-w-md p-8 bg-zinc-800"
                    onSubmit={handleSubmit}
                    >
                        {error && <p className="text-red-400">{error}</p>}
                    <h1 className="text-2xl">Новая задача</h1>
                <input
                    type="text"
                    placeholder="Напиши задачу"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="p-3 bg-zinc-900 border-2 border-zinc-600"
                />
                <button 
                    type="submit"
                    className="cursor-pointer font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                    disabled={loading}
                    >
                    Создать
                        </button>
                </form>
            </div>
    )
};