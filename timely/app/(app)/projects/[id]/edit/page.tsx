import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getUserSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'

// type ProjectPageProps = {
//   params: {
//     id: string
//   }
// }

export default async function ProjectEditPage({ params }: { params: { id: string } }) {
    const user = await getUserSession()
    const project = await prisma.project.findFirst({
        where: {
            tenantId: user.tenant.id,
            id: params.id
        }
    })

    if (!project) notFound()
    //   {
    //     return redirect('/projects')
    //   }

    async function editProject(data: FormData) {
        'use server'
        if (!project) return redirect('/projects')

        const user = await getUserSession()
        await prisma.project.updateMany({
            where: {
                tenant: {
                    id: user.tenant.id
                },
                id: project.id
            },
            data: {
                name: data.get('name') as string,
                color: data.get('color') as string
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
                <Button type="submit">Save</Button>
                <Button variant={'destructive'}asChild>
                    <Link href={`/projects/${project.id}`}>Cancel</Link>
                </Button>
            </div>
        </form>
    )
}