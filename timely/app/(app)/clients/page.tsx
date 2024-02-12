import { getUserSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Client } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { ClientList } from './client-list'

const Blankslate = () => {
    return (
    <div className='rounded-lg bg-slate-50 flex flex-col items-center gap-2 p-4'>
        <h2 className='text-lg font-semibold mb-2'>Create a Client</h2>
        <p>A client represents a company or individual you are doing work for. Create a client to keep your work organized.</p>
        <Button>Create</Button>
    </div>
    )
}

// for creating a client, make a popup like in harvest

export default async function TrackPage() {
    const user = await getUserSession()

    const clients = await prisma.client.findMany({
        where: {
            tenantId: user.tenant.id,
        }
    })


    return (
        <main className="mx-auto container py-4">
            <h1 className="text-xl font-medium mb-2">Clients</h1>
            {clients.length > 0 ? <ClientList clients={clients} />: <Blankslate />}
        </main>
    )
}
