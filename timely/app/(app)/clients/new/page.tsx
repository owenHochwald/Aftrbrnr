import { getUserSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export default async function ClientPage() {
    async function onCreate(data: FormData) {
        'use server'
        const user = await getUserSession()
        await prisma.client.create({
            data: {
                tenantId: user.tenant.id,
                name: data.get('name') as string,
                color: data.get('color') as string
            }
        })
        revalidatePath('/clients')
        redirect('/clients')
    }

    return (
        <div className="mx-auto container py-4">
            <h1 className="text-lg font-medium mb-2">Create a new client</h1>
            <form action={onCreate} className="flex items-center gap-4">
                <Input type="text" name="name" placeholder="Client Name" className='w-full' />
                <Input type="color" name="color" placeholder="Color" className='w-12' />
                <Button variant="outline" type='submit'>Create</Button>
            </form>
        </div>
    )
}
