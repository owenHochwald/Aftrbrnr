'use client'
import Link from 'next/link'
import { Avatar } from './avatar'
import ThemeSwitch from './switch-theme'

const links = [
    {href: "/home", label: "home"},
    {href: "/about", label: "about"},
    {href: "/reviews", label: "reviews"},
]

export async function SignedOutNavBar () {
    // const  {user, isLoaded} userUser();

    return (
        <div className="shadow">
            <div className="container nx-auto flex items-center py-2 space-x-6">
                <Link href="/" className='py-2 px-2 hover:bg-slate-100 rounded'>
                    <span className="font-bold">Aftrbrnr</span>
                </Link>
                <nav>
                    <ul className='flex items-center gap-4'>
                        {
                            links.map(({href, label}) => (
                            <li key={href}>
                                <Link
                                className="py-1 px-2 hover:bg-slate-100 rounded text-blue-800 hover:text-blue-500"
                                href={href}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <span className="flex-grow"/>
                <ThemeSwitch/>
            </div>
        </div>
    )
}