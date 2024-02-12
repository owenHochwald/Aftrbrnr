import { ClientList } from '../client-list'
import { getUserSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export default async function ClientLayout({children }: { children: React.ReactNode }) {

    const user = await getUserSession()

    const clients = await prisma.client.findMany({
        where: {
            tenantId: user.tenant.id,
        }
    })
    return (
        <div className='flex gap-4'>
            <ClientList clients={clients}/>
            <div>{children}</div>
        </div>
    )
  }