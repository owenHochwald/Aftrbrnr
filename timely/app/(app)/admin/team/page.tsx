import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getUserSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Copy } from "lucide-react"

// const DOMAIN = "aftrbrnr.com"
const DOMAIN = "localhost:3000"
const roles = ['OWNER', 'ADMIN', 'USER', 'TRACKER', 'VIEWER']

function capitalizeWord(word: string): string {
    if (!word) return word
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}


const getInitials = (name: string) => {
    const [firstName, lastName] = name.split(" ")
    return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase()
}

const InviteLink = async () => {
    const user = await getUserSession()
    const tenant = await prisma.tenant.findUnique({
        where: {
            id: user.tenant.id
        }
    })

    return (
        <div className="py-4 shadow border-1 px-1 rounded-lg space-y-4">
            <h2 className="text=center text-xl px-4">Invite Link</h2>
            <div className="flex py-2 px-4 items-center rounded-xl bg-stone-200">
                <Copy />
                <input
                    defaultValue={`${DOMAIN}/invite/${tenant?.inviteKey}`}
                    className="flex-grow mr-4 bg-stone-200 border-0"
                    disabled
                    readOnly
                />
            </div>
        </div>
    )
}


export default async function TeamPage() {

    async function updateUserRole(data:FormData) {
        'use server'

        console.log(data)
    }

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
            <h2 className="text-xl font-semibold mb-6">Your Team</h2>
            <ul className="px-4">
                {users.map(user => (
                    <li key={user.id} className='grid grid-cols-[64px_minmax(500px,_1fr)_100px]'>
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
                            <form action={updateUserRole}>
                                <Select defaultValue={user.role} >
                                    <SelectTrigger className="w-[100px]">
                                        <SelectValue placeholder="Role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>User Roles</SelectLabel>
                                            {
                                                roles.map((role) => (
                                                    <SelectItem key={role} value={role}>
                                                        {capitalizeWord(role)}
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </form>
                        </div>

                    </li>
                ))}
            </ul>
        </div>
    )
}