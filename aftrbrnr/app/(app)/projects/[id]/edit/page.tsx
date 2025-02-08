import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getUserSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'


export default async function ProjectEditPage({ params }: { params: { id: string } }) {
    const user = await getUserSession()
    const project = await prisma.project.findFirst({
        where: {
            tenantId: user.tenant.id,
            id: params.id
        }, include: {
            client: true
        }
    })

    const clients = (await prisma.client.findMany({
        where: {
            tenantId: user.tenant.id
        }
    })).map((client) => ({
        label: client.name,
        value: client.id
    }))


    if (!project) notFound()

    async function editProject(data: FormData) {
        'use server'

        const client = data.get('client') as string

        if (!project) return redirect('/projects')

        const user = await getUserSession()
        await prisma.project.updateMany({
            where: {
                tenantId: user.tenant.id,
                id: params.id
            },
            data: {
                name: data.get('name') as string,
                color: data.get('color') as string,
                clientId: client ? client : null
            }
        })
        revalidatePath(`/projects/${project.id}`)
        redirect(`/projects/${project.id}`)
    }

    return (
        <form action={editProject}>
            <h1 className="text-lg font-medium mb-2">Edit Project</h1>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <input type="hidden" defaultValue={project.id} />
                <Label htmlFor="name">Name</Label>
                <Input
                    type="text"
                    name="name"
                    placeholder="Project Name"
                    className="w-full"
                    defaultValue={project.name || ''}
                />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="color">Color</Label>
                <Input
                    type="color"
                    name="color"
                    placeholder="Color"
                    className="w-12"
                    defaultValue={project.color || ''}
                />
            </div>
            <div>
                <Label htmlFor="email">Client</Label>
                <Select name='client' defaultValue={project.clientId || ''}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Assign a client" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Clients</SelectLabel>
                            <SelectItem value="name">None</SelectItem>
                            {
                                clients.map((client) => (
                                    <SelectItem value={client.value} key={client.value}>
                                        {client.label}
                                    </SelectItem>
                                ))
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Button type="submit">Save</Button>
                <Button variant={'destructive'} asChild>
                    <Link href={`/projects/${project.id}`}>Cancel</Link>
                </Button>
            </div>
        </form>
    )
}