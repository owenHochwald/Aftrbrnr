import { getUserSession } from '@/lib/auth'
import Link from 'next/link'
import { Avatar, AvatarImage } from '../ui/avatar'

const links = [{href: "/track", label: "Track"}]

export async function NavBar () {
    const user = await getUserSession()
    return (
        <div className="shadow">
            <div className="container nx-auto flex items-center py-2 space-x-6">
                <Link href="/" className='py-2 px-2 hover:bg-slate-100 rounded'>
                    <span className="font-bold">Timely</span>
                </Link>
                <nav>
                    <ul>
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
                    <Avatar>
                        <AvatarImage src={user.image} referrerPolicy='no-referrer' />
                    </Avatar>
            </div>
        </div>
    )
}