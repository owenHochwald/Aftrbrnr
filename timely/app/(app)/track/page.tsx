import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { prisma } from "@/lib/prisma"
import { getUserSession } from "@/lib/auth"
import { Activity, Client, Project } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { ActivityDuration } from "./duration"
import { ArrowRight, Database, Hammer, UserRound } from "lucide-react"
import { ActivityItemRow } from "./activity-item-row"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

type TimeProps = {
    startAt: string
}

// Timer Aspect
const Time = ({ startAt }: TimeProps) => {
    const date = new Date(startAt)
    const now = new Date()
    const elapsed = now.getTime() - date.getTime()
    return (<div>{elapsed}</div>)
}

type NewActivityProps = {
    activity?: Activity | null
    clients: Client[]
    projects: Project[]
}


const NewActivity = ({ activity, clients, projects }: NewActivityProps) => {
    async function startActivity(data: FormData) {
        'use server'
        const user = await getUserSession()

        const activity = await prisma.activity.create({
            data: {
                user: { connect: { id: user.id } },
                tenant: { connect: { id: user.tenant.id } },
                name: data.get('name') as string,
                startAt: new Date(),
                client: {
                    connect: {
                        id: data.get('client') as string ?? undefined
                    }
                },
                project: {
                    connect: {
                        id: data.get('project') as string ?? undefined
                    }
                }
            }
        })

        revalidatePath('/track')
    }

    async function stopActivity(data: FormData) {
        'use server'
        await prisma.activity.update({
            where: {
                id: data.get('id') as string
            },
            data: {
                endAt: new Date()
            }
        })
        revalidatePath('/track')
    }

    return (
        <div>
            <h2 className="text-lg mb-2 font-semibold">What are you working on?</h2>
            <form action={activity ? stopActivity : startActivity}>
                <div className="flex items-center space-x-4">
                    <Input type="text" name="name" defaultValue={activity?.name || ""} />
                    <input type="hidden" name="id" defaultValue={activity?.id || ""} />
                    <Select name='client'>
                        <SelectTrigger className="w-[60px]">
                            <UserRound size={5} className="w-5 h-5" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Clients</SelectLabel>
                                <SelectItem value="name">None</SelectItem>
                                {
                                    clients.map((client) => (
                                        <SelectItem value={client.id} key={client.id}>
                                            {client.name}
                                        </SelectItem>
                                    ))
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select name='project'>
                        <SelectTrigger className="w-[60px]">
                            <Hammer size={5} className="w-5 h-5" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Projects</SelectLabel>
                                <SelectItem value="name">None</SelectItem>
                                {
                                    projects.map((project) => (
                                        <SelectItem value={project.id} key={project.id}>
                                            {project.name}
                                        </SelectItem>
                                    ))
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {activity && <ActivityDuration startAt={activity.startAt} />}
                    <Button type="submit">{activity ? 'Stop' : 'Start'}</Button>
                </div>
            </form>
        </div>
    )
}

type DailyActivitesProps = {
    activites: Activity[]
}

const DailyActivites = ({ activites }: DailyActivitesProps) => {

    return (
        <div>
            <h2 className="text-lg mb-2 font-semibold">Your work for today!</h2>
            <ul>{
                activites.map(activity => (
                    <ActivityItemRow activity={activity} key={activity.id} />
                ))
            }</ul>
        </div>
    )
}


export default async function TrackPage() {
    const user = await getUserSession()
    const currentActivity = await prisma.activity.findFirst({
        where: {
            tenantId: user.tenant.id,
            userId: user.id,
            endAt: null
        }
    })

    const clients = await prisma.client.findMany({
        where: {
            tenantId: user.tenant.id
        }
    })

    const projects = await prisma.project.findMany({
        where: {
            tenantId: user.tenant.id
        }
    })

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

    const dailyActivites = await prisma.activity.findMany({
        where: {
            tenantId: user.tenant.id,
            userId: user.id,
            OR: [
                {
                    startAt: {
                        equals: startOfToday
                    },
                },
                {
                    endAt: {
                        lte: endOfToday
                    },
                },
            ],
        },
        orderBy: {
            startAt: 'desc'
        }
    });


    return (
        <div className="mx-auto container py-4 space-y-12">
            <NewActivity activity={currentActivity} clients={clients} projects={projects} />
            <DailyActivites activites={dailyActivites} />
        </div>
    )
}
