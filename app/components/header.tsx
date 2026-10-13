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
    <header className='flex gap-5'>
    <h1>TeamFlow</h1>
    <button onClick={handleLogout}>Выйти</button>
    </header>
    )
}