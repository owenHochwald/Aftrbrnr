import { getUserSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getDuration, getDurationInMilliseconds } from "@/lib/time"
import { DatePickerWithRange } from "./edit-date"
import { Button } from "@/components/ui/button"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { Card, Title } from "@tremor/react"
import { ActivityBarChart, ActivityDonutChart, ClientDonutChart, SwitchActivityChart, SwitchClientChart } from "./chart"
import { Activity } from "@prisma/client"


type Props = {
    searchParams: {
        from: string
        to: string
    }
}

const totalActivitiesDuration = (activites: Activity[]) =>
    activites.reduce(
        (total, activity) =>
            (activity.endAt || new Date()).getTime() -
            activity.startAt.getTime(),
        0
    ) / 1000 / 60 / 60

const getDates = (from: string, to: string) => {
    const startOfWeek = new Date(
        new Date().setDate(new Date().getDate() - new Date().getDay())
    ).toISOString()
    const endOfWeek = new Date(
        new Date().setDate(new Date().getDate() - new Date().getDay() + 6)
    ).toISOString()

    const fromDate = new Date(from || startOfWeek)

    if (fromDate.toString() == "Invalid Date") {
        throw new Error("Invalid 'from' date, please use ISO format.")
    }
    const toDate = new Date(to || endOfWeek)
    if (toDate.toString() == "Invalid Date") {
        throw new Error("Invalid 'from' date, please use ISO format.")
    }
    if (fromDate > toDate) {
        throw new Error("Invalid 'from' date, 'to' date must be after 'from' date.")
    }

    fromDate.setHours(0, 0, 0, 0)
    toDate.setHours(23, 59, 59, 999)

    return {
        from: fromDate,
        to: toDate
    }
}

export default async function AnalyticsPage({ searchParams: { from: fromUnparsed, to: toUnparsed } }: Props) {
    async function reload(data: FormData) {
        'use server'
        revalidatePath('/analytics')
        redirect(`/analytics?from=${data.get('from')}&to=${data.get('to')}`)
    }
    // const activites = await prisma.activity.findMany({
    //     where: {
    //         //  ALL activites the TENANT has done, not the user
    //         // this means that if many people share a tenant ID,
    //         // all their activites will be shown, rather than it individual

    //         // can make it based on role in future

    //         // make sure i have validation for these queries
    //         tenantId: user.tenant.id,
    //         startAt: {
    //             gte: from,
    //             lte: to
    //         }
    //     },
    //     include: {
    //         client: true
    //     }
    // })

    const { from, to, } = getDates(fromUnparsed, toUnparsed)
    const user = await getUserSession()

    const clients = await prisma.client.findMany({
        where: {
            tenantId: user.tenant.id,
            activities: {
                some: {
                    startAt: {
                        gte: from,
                    },
                    endAt: {
                        lte: to,
                    },
                },
            },
        },
        include: {
            activities: {
                where: {
                    startAt: {
                        gte: from,
                    },
                    endAt: {
                        lte: to,
                    },
                },
            },
        },
    })

    const nullClientActivities = await prisma.activity.findMany({
        where: {
            tenantId: user.tenant.id,
            clientId: null,
            startAt: {
                gte: from,
            },
            endAt: {
                lte: to,
            },
        },
    })

    const clientData = [
        {
            name: 'No Client',
            duration: totalActivitiesDuration(nullClientActivities)
        },

        ...clients.map((client) => ({
            name: client.name,
            duration: totalActivitiesDuration(client.activities)
        }))
    ]

    const activityChartData: Record<string, number> = {}
        ;[...nullClientActivities, ...clients.flatMap(client => client.activities)].forEach(activity => {
            const key = activity.name || '(No Name)'
            const ms = activityChartData[key] || 0
            activityChartData[key]
                = ms +
                getDurationInMilliseconds(activity.startAt, activity.endAt || new Date())
        })

    return (
        <div className="mx-auto container py-4 grid grid-cols-2 gap-8">
            <div className="space-y-4">
                <h1 className="text-lg font-medium mb-2">Analytics</h1>
                <form action={reload} className="flex items-center gap-4">
                    <DatePickerWithRange to={to} from={from} />
                    <Button type="submit">Submit</Button>
                </form>
                {nullClientActivities.length > 0 && (
                    <div>
                        <h2 className="text-lg font-bold space-y-3 divide-y">No client</h2>
                        <ul className="divide-y">
                            {nullClientActivities.map(activity => (
                                <li key={activity.id} className="py-2">
                                    {activity.name} - {getDuration(activity.startAt, activity.endAt || new Date())}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {clients.length > 0 && (
                    <ul className="">
                        {clients.map((client) => (
                            <div key={client.id}>
                                <h2 className="text-lg font-bold space-y-3">{client.name}</h2>
                                <li key={client.id} className="py-2 divide-y">
                                    {client.activities.map((activity) => (
                                        <li key={activity.id} className="py-2">
                                            {activity.name} - {' '}
                                            {getDuration(activity.startAt, activity.endAt || new Date())}
                                        </li>
                                    ))}
                                </li>
                            </div>

                        ))}
                    </ul>
                )}
            </div>
            <div className="space-y-4">
                <h2>Charts</h2>
                <Card className="max-w-lg">
                    <SwitchClientChart data={clientData} />
                </Card>
                <Card className="max-w-lg">
                    <SwitchActivityChart data={Object.entries(activityChartData).map(([name, duration]) => ({
                        name,
                        duration: duration / 1000 / 60 / 60
                    }))}
                    />
                </Card>
            </div>
        </div>
    )
}