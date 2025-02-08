import { SignedOutNavBar } from '@/components/signed-out-nav-bar'

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
            <div className="px-4 flex-grow w-full mx-auto mt-10">{children}</div>
        </>
    )
}