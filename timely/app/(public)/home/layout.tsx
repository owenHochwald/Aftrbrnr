import { SignedOutNavBar } from '@/components/signed-out-nav-bar'
import { Button } from '@/components/ui/button'
import { getUserSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

const links = [
    { href: "/admin/profile", label: "Profile" },
    { href: "/admin/team", label: "Team" },
    { href: "/admin/appearance", label: "Appearance" },
    { href: "/admin/integrations", label: "Integrations" },
    { href: "/admin/about", label: "About" },
]


export default async function AdminLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <SignedOutNavBar />
            <div className="px-4 flex-grow mt-5">{children}</div>
        </>
    )
}