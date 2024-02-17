import { getUserSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import Link from 'next/link'

type ClientPageProps = {
    params: {
        id: string
    }
}


export default async function ClientPage({ params }: ClientPageProps) {
    const user = await getUserSession()
    const client = await prisma.client.findFirst({
        where: {
            tenantId: user.tenant.id,
            id: params.id
        }
    })

    if (!client) {
        return <div>Client not found</div>
    }

    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-medium mb-2">Client</h1>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <MoreHorizontal />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            <Link href={`/clients/${client.id}/edit`}>Edit</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <h3>{client.name}</h3>
        </div>
    )
}
