'use client'

import { Activity } from "@prisma/client";
import { CalendarIcon, PlayIcon, SaveIcon, Settings2, TrashIcon } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

import { pad } from '@/lib/utils';
import { updateActivity, deleteActivity } from "./actions";


type Props = {
    activity: Activity
}

type EditDateTimeProps = {
    name?: string
    value: Date
    onChange?: (value: Date) => void
}
type EditActivityDurationProps = {
    name?: string
    value: number
    onChange?: (value: number) => void
}

const EditActivityDuration = ({ name, value, onChange }: EditActivityDurationProps) => {
    const [duration, setDuration] = useState(value)
    const formatDuration = (seconds: number) => {
        const hours = Math.floor(seconds / 3600)
        const minutes = Math.floor((seconds % 3600) / 60)
        const remainingSeconds = seconds % 60
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
    }
    const [inputValue, setInputValue] = useState(formatDuration(value))


    const parseDuration = (durationString: string) => {
        const [hours, minutes, seconds] = durationString.split(':').map(Number)
        return (hours * 3600) + (minutes * 60) + seconds
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setInputValue(newValue)
        const newDuration = parseDuration(newValue)
        setDuration(newDuration)
        onChange && onChange(newDuration)
    }

    return (
        <div className="relative flex items-center">
            <input type="hidden" name={name} value={duration.toString()} />
            <Input
                type="text"
                value={inputValue}
                className="pr-8"
                onChange={handleInputChange}
            />
        </div>
    )
}


const EditDateTime = ({ name, value, onChange }: EditDateTimeProps) => {
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
                        <CalendarIcon size={16} />
                    </PopoverTrigger>
                    <PopoverContent>
                        <Calendar
                            mode="single" selected={date} onSelect={onDate} />
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
    // add a const user = await getUserSession() -> update the project and client with this new data
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
                    defaultValue={activity.name || 'Unnamed Task'}
                />
                <EditDateTime name="startAt" value={activity.startAt} />
                <EditActivityDuration name="duration" value={activity.duration} />
                <span className="flex-grow" />
                <Button type="submit" size={'icon'} variant={'ghost'}>
                    <SaveIcon />
                </Button>
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
        <>
            <li className='py-3 space-x-5 flex items-center border-b '>
                <span className="text-md font-medium w-1/5">{activity.name || 'Unnamed Task'}</span>
                <Badge variant="secondary" className="center">
                    Started at {new Intl.DateTimeFormat(undefined, {
                        hour: 'numeric',
                        minute: 'numeric',
                    }).format(activity.startAt)}
                </Badge>
                <Badge variant="secondary" className="center">{((Math.abs((activity.endAt?.getTime() || 0) - (activity.startAt?.getTime() || 0)) / (1000 * 60 * 60)).toFixed(1))} hours</Badge>
                <span className='flex-grow' />

                <Button variant={'ghost'} size='icon' >
                    <PlayIcon onClick={() => console.log(activity.id)} />
                </Button>
                <Button onClick={edit} size={'icon'} variant={'ghost'}>
                    <Settings2 />
                </Button>
                {/* Delete dialog and button */}
                <AlertDialog>
                    <AlertDialogTrigger>
                        <Button size={'icon'} className="ml-2 hover:bg-red-500" variant="ghost">
                            <TrashIcon />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure you want to delete this activity?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your activity.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="hover:bg-red-700 bg-red-500" onClick={() => onDelete(activity.id)}>
                                <TrashIcon size={20} /> Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </li>
        </>
    );
};

export const ActivityItemRow = ({ activity }: Props) => {
    const [isEditing, setIsEditing] = useState(false)
    return isEditing ? (
        <EditItemRow activity={activity} onSave={() => setIsEditing(false)} />
    ) : (
        <>
            <ReadItemRow activity={activity} edit={() => setIsEditing(true)} onDelete={deleteActivity} />
        </>
    )
}