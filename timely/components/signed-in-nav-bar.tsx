import { getUserSession } from '@/lib/auth'
import Link from 'next/link'
import { Avatar } from './avatar'

import ThemeSwitch from './switch-theme'

const links = [
    { href: "/track", label: "Track" },
    { href: "/analytics", label: "Analytics" },
    { href: "/clients", label: "Clients" },
    { href: "/projects", label: "Projects" },
]

export async function SignedInNavBar() {
    const user = await getUserSession()
    return (
        <div className="shadow">
            <div className="container nx-auto flex items-center py-2 space-x-6">
                <Link href="/" className='py-2 px-2 hover:bg-slate-100 rounded'>
                    <span className="font-bold text-lg">Aftrbrnr</span>
                </Link>
                <nav>
                    <ul className='flex items-center flex-col gap-6 text-md font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-md lg:gap-6'>
                        {
                            links.map(({ href, label }) => (
                                <li key={href}>
                                    <Link
                                        className='text-foreground transition-colors hover:text-foreground text-muted-foreground hover:bg-slate-100 rounded-md px-2 py-1'
                                        href={href}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                    </ul>
                </nav>
                <span className="flex-grow" />
                <ThemeSwitch />
                <Avatar user={user} />
            </div>
        </div>
    )
}