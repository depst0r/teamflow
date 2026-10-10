'use client'

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

export default function Register() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        const supabase = createClient()

        const { data, error } = await supabase.auth.signUp({email, password})

        if (error) {
            setError(error.message)
            } else {
            console.log('Создан:', data.user)
            }

        setLoading(false)
    }

    return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-zinc-100">
        <form 
            className="flex flex-col gap-4 w-full max-w-md p-8 bg-zinc-800"
            onSubmit={handleSubmit}
            >
                {error && <p className="text-red-400">{error}</p>}
            <h1 className="text-2xl">Регистрация</h1>
        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="p-3 bg-zinc-900 border-2 border-zinc-600"
        />
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="p-3 bg-zinc-900 border-2 border-zinc-600"
        />
        <button 
            type="submit"
            className="cursor-pointer font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            disabled={loading}
            >
            {loading ? 'Создаём...' : 'Зарегистрироваться'}
                </button>
        </form>
    </div>
)

}