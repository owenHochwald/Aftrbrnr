import { getUserSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { notFound, redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'


export default async function ProjectDetailPage({ params }: { params: { id: string } }) {

    const user = await getUserSession()
    const project = await prisma.project.findFirst({
        where: {
            id: params.id,
            tenantId: user.tenant.id
        },
        include: {
            client: true
        }
    })


    if (!project) {
        throw notFound()
    }

    async function deleteProject() {
        'use server'
        if (!project) throw new Error('project not found')
        await prisma.client.deleteMany({
            where: {
                tenantId: user.tenant.id,
                id: project.id
            }
        })
        revalidatePath('/projects')
        redirect('/projects')
    }

    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-medium mb-2">Project</h1>
                <Dialog>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <MoreHorizontal />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                <Link className='w-full' href={`/projects/${project.id}/edit`}>Edit</Link>
                            </DropdownMenuItem>
                            <DialogTrigger asChild>
                                <DropdownMenuItem className="text-red-500">
                                    Delete
                                </DropdownMenuItem>
                            </DialogTrigger>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete this client?</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. Are you sure you want to permanently
                                permanently delete this project?
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <form action={deleteProject}>
                                <Button type="submit" variant={'destructive'}>
                                    Delete
                                </Button>
                            </form>

                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <h3>{project.name}</h3>
            <div className='container flex gap-4 items-center justify-center'>
                <h3 className="text-md font-medium">Client: </h3>
                <p>{project.client?.name}</p>

            </div>
        </div>
    )

}
