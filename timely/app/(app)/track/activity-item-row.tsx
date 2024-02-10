'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { pad } from '@/lib/utils'
import { Activity } from "@prisma/client"
import { useState } from "react"
import { ArrowRight, CalendarIcon } from "lucide-react"
import { updateActivity, deleteActivity } from "./actions"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover"

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

    const onDate = (d: Date | undefined) => {
        if (!d) return

        // creating a new date with the same time
        d.setHours(d.getHours())
        d.setMinutes(d.getMinutes())
        d.setSeconds(d.getSeconds())
        setDate(d)
        onChange && onChange(d)
    }

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
                <Popover>
                    <PopoverTrigger className="absolute right-2 h-4 w-4">
                        <CalendarIcon size={16}/>
                    </PopoverTrigger>
                    <PopoverContent>
                        <Calendar
                            mode="single" selected={date} onSelect={onDate}/>
                    </PopoverContent>
                </Popover>

            </div>
        </div>
    )
}

type EditRowProps = Props & {
    onSave: () => void
}

const EditItemRow = ({ activity, onSave }: EditRowProps) => {
    return (
        <li className='py-5'>
            <form action={async (data) => {
                await updateActivity(data)
                onSave()
            }}
                className='flex items-center space-x-2'
            >
                <input type='hidden' defaultValue={activity.id} name="id" />
                <Input
                    className='w-[300px]'
                    type="text"
                    name="name"
                    defaultValue={activity.name || ''}
                />
                <EditDateTime name="startAt" value={activity.startAt}/>
                <EditDateTime name="endAt" value={activity.endAt || new Date()}/>
                <span className="flex-grow"/>
                <Button type="submit">Save</Button>
            </form>
        </li>
    )
}

type ReadItemRowProps = Props & {
    edit: () => void
    onDelete: (id: string) => void
}


const ReadItemRow = ({ activity, onDelete, edit }: ReadItemRowProps) => {
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
            <span className='flex-grow'/>
            <Button onClick={edit}>Edit</Button>
            <Button onClick={ async () => onDelete(activity.id)} className="ml-2" variant="outline">Delete</Button>
        </li>
    )
}


export const ActivityItemRow = ({ activity }: Props) => {
    const [isEditing, setIsEditing] = useState(false)
    return isEditing ? (
        <EditItemRow activity={activity} onSave={() => setIsEditing(false)} />
    ) : (
        <>
            <ReadItemRow activity={activity} edit= { () => setIsEditing(true)} onDelete={ deleteActivity }/>
        </>
    )
}