import Link from 'next/link'

export default async function AdminLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <div className="shadow">
                <div className="container mx-auto flex space-x-2">
                    <Link href="/" className='py-4 hover:bg-slate-100 rounded'>
                        <span className="font-bold text-2xl">Aftrbrnr</span>
                    </Link>
                </div>
            </div>
            <div className="flex-grow w-full mx-auto mt-5">{children}</div>
        </>
    )
}