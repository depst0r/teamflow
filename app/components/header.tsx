'use client'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function Header() {
    const router = useRouter()

    const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
    }

    return (
    <header className='flex justify-around border-b border-slate-700'>
    <h1 className='font-bold text-2xl font-bold tracking-tight text-slate-900 dark:text-white'>TeamFlow</h1>
    <button className='cursor-pointer' onClick={handleLogout}>Выйти</button>
    </header>
    )
}