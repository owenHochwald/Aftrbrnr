// import React, { useState } from 'react';
import { getUserSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getDuration } from "@/lib/time"
import { DatePickerWithRange } from "./edit-date"
import { Button } from "@/components/ui/button"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"


type Props = {
    searchParams: {
        from: string
        to: string
    }
}

const getDates = (from: string, to: string) => {
    // default to startOfWeek --> assuming week starts on Sunday
    // unit tests
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
    const { from, to, } = getDates(fromUnparsed, toUnparsed)
    // const [formSubmitted, setFormSubmitted] = useState(false);


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
    async function reload(data: FormData) {
        'use server'
        revalidatePath('/analytics')
        redirect(`/analytics?from=${data.get('from')}&to=${data.get('to')}`)
    }


    return (
        <div className="mx-auto container py-4">
            <h1 className="text-lg font-medium mb-2">Analytics</h1>
            <form className="flex items-center gap-4">
                <DatePickerWithRange to={to} from={from} />
                <Button type="submit">Submit</Button>
            </form>

            {activites.length > 0 && (
                <ul className="divide-y">
                    {
                        activites.map(activity => (
                            <li key={activity.id} className="py-2">
                                {activity.name} - {getDuration(activity.startAt, activity.endAt || new Date())}
                            </li>
                        ))}
                </ul>
            )}
        </div>
    )
}