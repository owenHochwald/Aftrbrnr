'use client'
import Link from 'next/link'
import ThemeSwitch from './switch-theme'

import { Button } from './ui/button'
import { Key } from 'lucide-react'

const links = [
    { href: "/home", label: "Home" },
    { href: "/usecases", label: "Use Cases" },
    { href: "/reviews", label: "Reviews" },
    { href: "/about", label: "About" },
]

export async function SignedOutNavBar() {
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
                                        className="text-foreground transition-colors hover:text-foreground text-muted-foreground hover:bg-slate-100 rounded-md px-2 py-1"
                                        href={href}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                    </ul>
                </nav>
                <span className="flex-grow" />
                {/* make this do something */}
                <ThemeSwitch />
                <Button className='inline-flex items-center' variant={'secondary'} >
                    <Link href="/signin" className='flex items-center'>
                    Login <span className="ml-1"><Key className='h-4 w-4'/></span>
                    </Link>
                </Button>

            </div>
        </div>
    )
}