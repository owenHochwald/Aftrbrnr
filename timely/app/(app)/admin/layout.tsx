import { Button } from '@/components/ui/button'
import { getUserSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { SidebarListItem } from './sidebar-list-item'

const links = [
    { href: "/admin/profile", label: "Profile" },
    { href: "/admin/settings", label: "Settings" },
    { href: "/admin/about", label: "About" },
]

const Sidebar = () => {
    return (
        <ul className="w-1/5 px-4">
            {links.map((link) => (
                <SidebarListItem key={link.href} {...link}/>
            ))}
        </ul>
    )
}

export default async function AdminLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="container mx-auto flex gap-4 divide-x-2 py-4">
            <Sidebar />
            <div className="px-4 flex-grow">{children}</div>
        </div>
    )
}