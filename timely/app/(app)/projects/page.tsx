import { Button } from '@/components/ui/button'
import { getUserSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { ProjectList } from './projects'

const Blankslate = () => {
    return (
        <div className="rounded-lg bg-slate-50 flex flex-col items-center gap-4 p-4">
            <h2 className="text-lg font-semibold">Create a Project</h2>
            <p>A project represents work you are doing for a client.</p>
            <Button asChild>
                <Link href="/projects/new">Create Project</Link>
            </Button>
        </div>
    )
}

export default async function ProjectPage() {
    const user = await getUserSession()
    const projects = await prisma.project.findMany({
        where: {
            tenantId: user.tenant.id
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return (
        <div className="mx-auto container py-4">
            {projects.length > 0 ? <ProjectList projects={projects} /> : <Blankslate />}
        </div>
    )
}