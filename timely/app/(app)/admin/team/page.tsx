import { getUserSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// const DOMAIN = "aftrbrnr.com"
const DOMAIN = "localhost:3000"

const InviteLink = async() => {
    const user = await getUserSession()
    const tenant = await prisma.tenant.findUnique({
        where: {
            id: user.tenant.id
        }
    })

    return (
        <div className="p-4 shadow border-1 rounded-lg space-y-4">
            <h2 className="text=center text-xl">Invite Link</h2>
            <input defaultValue={`${DOMAIN}/invite/${tenant?.inviteKey}`} className="border-1 bg-stone-200 py-2 px-4 rounded-xl w-full" disabled readOnly/>
        </div>
    )
}


export default async function TeamPage() {
    const user = await getUserSession()

    return (
        <div>
            <h1 className="text-3xl mb-4">Team</h1>
            <InviteLink/>
        </div>
    )
}