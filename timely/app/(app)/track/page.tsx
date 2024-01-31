import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { prisma } from "@/lib/prisma"
import { getUserSession } from "@/lib/auth"
import { Activity } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { ActivityDuration } from "./duration"
import { ArrowRight } from "lucide-react"

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
}

const NewActivity = ({ activity }: NewActivityProps) => {
    async function startActivity(data: FormData) {
        'use server'
        const user = await getUserSession()

        const activity = await prisma.activity.create({
            data: {
                user: { connect: { id: user.id } },
                tenant: { connect: { id: user.tenant.id } },
                name: data.get('name') as string,
                startAt: new Date(),
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
                    <li className='py-2 space-x-2 flex items-center' key={activity.id}>
                        <span className="text-md font-medium w-1/5">{activity.name}</span>
                        <span>
                            {new Intl.DateTimeFormat(undefined, {
                                hour: 'numeric',
                                minute: 'numeric',
                            }).format(activity.startAt)}
                        </span>
                        <ArrowRight size={20}/>
                        <span>
                            {new Intl.DateTimeFormat(undefined, {
                                hour: 'numeric',
                                minute: 'numeric',
                            }).format(activity.endAt || new Date())}
                        </span>
                    </li>
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
        <main className="mx-auto container py-4 space-y-12">
            <NewActivity activity={currentActivity} />
            <DailyActivites activites={dailyActivites} />
        </main>
    )
}
