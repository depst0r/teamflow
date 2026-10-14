import Link from "next/link";

export default function FilterBar(){
    return (
        <div className="flex gap-2 mb-4">
            <Link href='/' className="px-3 py-1.5 rounded text-sm bg-slate-800 hover:bg-slate-700 text-zinc-300">Все</Link>
            <Link href='/?status=todo' className="px-3 py-1.5 rounded text-sm bg-slate-800 hover:bg-slate-700 text-zinc-300">К выполнению</Link>
            <Link href='/?status=in_progress' className="px-3 py-1.5 rounded text-sm bg-slate-800 hover:bg-slate-700 text-zinc-300">В работе</Link>
            <Link href='/?status=done' className="px-3 py-1.5 rounded text-sm bg-slate-800 hover:bg-slate-700 text-zinc-300">Готово</Link>
        </div>
    )
};