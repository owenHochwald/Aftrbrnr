'use client'

import { pad } from '@/lib/utils'
import { Input } from "@/components/ui/input"
import { Activity } from "@prisma/client"
import { useState } from "react"
import { ArrowRight, Calendar } from "lucide-react"
import { updateActivity } from "./actions"
import { Button } from "@/components/ui/button"

type Props = {
    activity: Activity
}

type EditDateTimeprops = {
    name?: string
    value: Date
    onChange?: (value: Date) => void
}

const EditDateTime = ({ name, value, onChange }: EditDateTimeprops) => {
    const [date, setDate] = useState(value)

    return (
        <div>
            <div className='relative flex items-center'>
                <input type="hidden" name={name} defaultValue={date.toISOString()} />
                <Input
                    type="time"
                    value={`${pad(date.getHours())}:${pad(date.getMinutes())}`}
                    className="pr-8"
                    onChange={(e) => {
                        const [hours, minutes] = e.target.value.split(':')
                        const newDate = new Date(date)
                        newDate.setHours(parseInt(hours) || 0)
                        newDate.setMinutes(parseInt(minutes) || 0)
                        setDate(newDate)
                        onChange && onChange(newDate)
                    }}
                />
                <Calendar size={16} className='absolute right-2' />
            </div>
        </div>
    )
}

type EditRowProps = Props & {
    onSave: () => void
}

const EditItemRow = ({ activity, onSave }: EditRowProps) => {
    // const [test, setTest] = useState
    return (
        <li className='py-5'>
            <form action={async (data) => {
                await updateActivity(data)
                onSave()
            }}
                className='flex items-center space-x-2'
            >
                <Input
                    className='w-[300px]'
                    type="text"
                    name="name"
                    defaultValue={activity.name || ''}
                />
                <EditDateTime name="startAt" value={activity.startAt}/>
                <EditDateTime name="endAt" value={activity.endAt || new Date()}/>
                <Button type="submit">Save</Button>
            </form>
        </li>
    )
}

const ReadItemRow = ({ activity }: Props) => {
    return (
        <li className='py-3 space-x-5 flex items-center'>
            <span className="text-md font-medium w-1/4">{activity.name}</span>
            <span>
                {new Intl.DateTimeFormat(undefined, {
                    hour: 'numeric',
                    minute: 'numeric',
                }).format(activity.startAt)}
            </span>
            <ArrowRight size={20} />
            <span>
                {new Intl.DateTimeFormat(undefined, {
                    hour: 'numeric',
                    minute: 'numeric',
                }).format(activity.endAt || new Date())}
            </span>
        </li>
    )
}


export const ActivityItemRow = ({ activity }: Props) => {
    const [isEditing, setIsEditing] = useState(false)
    return isEditing ? (
        <EditItemRow activity={activity} onSave={() => setIsEditing(false)} />
    ) : (
        <>
            <ReadItemRow activity={activity} />
            <Button className="flex items-center space-x-2" onClick={() => setIsEditing(true)}>Edit</Button>
        </>
    )
}