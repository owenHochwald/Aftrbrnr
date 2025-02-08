import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getUserSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Copy } from "lucide-react"
import { UpdateRoleForm } from "./update-form"
import { isAdmin } from "@/lib/authorization"
import { Role } from "@prisma/client"
import { getInitials } from "@/lib/utils"
import { CopyButton } from "@/components/copy-button"

// const DOMAIN = "aftrbrnr.com"
const DOMAIN = "http://localhost:3000"


const InviteLink = async () => {
    const user = await getUserSession()
    const tenant = await prisma.tenant.findUnique({
        where: {
            id: user.tenant.id
        }
    })
    const inviteLink = `${DOMAIN}/invite/${tenant?.inviteKey}`


    return (
        <div className="py-4 space-y-4">
            <h2 className="text-xl font-medium">Invite Link</h2>
            <div className="flex items-center bg-neutral-200 p-2 rounded-xl">
                <input
                    defaultValue={inviteLink}
                    className="py-2 px-4 w-full bg-transparent border border-gray-300 rounded-xl border-0"
                    readOnly
                />
                <CopyButton text={inviteLink}/>

            </div>
        </div>
    )
}


export default async function TeamPage() {

    async function updateUserRole({ id, role }: { id: string, role: Role }) {
        'use server'
        const session = await getUserSession()
        const user = await prisma.user.findUnique({
            where: {
                id: session.id
            }
        })
        // checks use and if they have access to change roles
        if (!isAdmin(user)) {
            throw new Error('Not authorized to change roles')
        }
        if (user?.role === "OWNER" && user.id === id) {
            throw new Error('Owners cannot change roles')
        }

        await prisma.user.update({
            where: {
                id
            },
            data: {
                role
            }
        })
    }

    const user = await getUserSession()
    const users = await prisma.user.findMany({
        where: {
            tenantId: user.tenant.id
        }
    })

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Team</h1>
            <InviteLink />
            <h2 className="text-xl font-semibold mb-8">Your Team</h2>
            <ul className="px-4 w-full divide-y divide-neutral-200/50">
                {users.map(user => (
                    <li key={user.id} className='grid grid-cols-[64px_minmax(500px,_1fr)_100px] py-4'>
                        <div>
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={user.avatar || ''} />
                                <AvatarFallback>{getInitials(user.name || 'No name')}</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-lg font-semibold">{user.name}</span>
                            <span className="text-slate-500">{user.email}</span>
                        </div>
                        <div className="flex flex-col justify-center gap-1">
                            <UpdateRoleForm id={user.id} onRoleUpdate={updateUserRole} role={user.role} />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}