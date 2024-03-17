import { getUserSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getDuration } from "@/lib/time"
import { EditDate } from "./edit-date"


type Props = {
    searchParams: {
        from: string
        to: string
    }
}

const getDates = (from: string, to: string) => {
    // default to startOfWeek --> assuming week starts on Monday
    // unit tests
    const startOfWeek = new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 6) % 7)).toISOString()
    const endOfWeek = new Date(new Date().setDate(new Date().getDate() + (7 - new Date().getDay()))).toISOString()



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
    return {
        from: fromDate,
        to: toDate
    }
}


export default async function AnalyticsPage({ searchParams: { from: fromUnparsed, to: toUnparsed } }: Props) {

    const { from, to, } = getDates(fromUnparsed, toUnparsed)

    const user = await getUserSession()
    const activites = await prisma.activity.findMany({
        where: {
            //  ALL activites the TENANT has done, not the user
            // this means that if many people share a tenant ID,
            // all their activites will be shown, rather than it individual

            // can make it based on role in future

            // make sure i have validation for these queries
            tenantId: user.tenant.id,
            startAt: {
                gte: from,
                lte: to
            }
        }
    })

    return (
        <div className="mx-auto container py-4">
            <h1 className="text-lg font-medium mb-2">Analytics</h1>
            <form className="flex items-center gap-4">
                <div className="border rounded-md flex items-center gap-2 px-2">
                    <label htmlFor="from">From</label>
                    <EditDate name="from" date={from} bounds="start" />
                </div>
                <div className="border rounded-md flex items-center gap-2 px-2">
                    <label htmlFor="to">To</label>
                    <EditDate name="to" date={to} bounds="end" />
                </div>
            </form>

            {
                activites.length > 0 && (
                    <ul className="divide-y">
                        {
                            activites.map(activity => (
                                <li key={activity.id} className="py-2">
                                    {activity.name} - {getDuration(activity.startAt, activity.endAt || new Date())}
                                </li>
                            ))}
                    </ul>
                )
            }

        </div>
    )
}