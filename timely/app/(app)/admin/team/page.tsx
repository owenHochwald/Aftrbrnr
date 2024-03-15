import { getUserSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Copy } from "lucide-react"

// const DOMAIN = "aftrbrnr.com"
const DOMAIN = "localhost:3000"

const InviteLink = async () => {
    const user = await getUserSession()
    const tenant = await prisma.tenant.findUnique({
        where: {
            id: user.tenant.id
        }
    })

    return (
        <div className="p-4 shadow border-1 rounded-lg space-y-4">
            <h2 className="text=center text-xl">Invite Link</h2>
            <div>

            </div>
            <div className="border-1 bg-stone-200 py-2 px-4 rounded-xl flex items-center">
                <input
                    defaultValue={`${DOMAIN}/invite/${tenant?.inviteKey}`}
                    className="flex-grow mr-4"
                    disabled
                    readOnly
                />
                <Copy />
            </div>
        </div>
    )
}


export default async function TeamPage() {
    const user = await getUserSession()
    const users = await prisma.user.findMany({
        where: {
            tenantId: user.tenant.id
        }
    })

    return (
        <div>
            <h1 className="text-3xl mb-4">Team</h1>
            <InviteLink />
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} : {user.email} -- {user.role}
                    </li>
                ))}
            </ul>
        </div>
    )
}