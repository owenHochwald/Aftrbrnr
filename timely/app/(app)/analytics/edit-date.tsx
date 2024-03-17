'use client'

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { useState } from "react"
import { Calendar } from '@/components/ui/calendar'
import { resolveTxt } from "dns/promises"


type EditDateProps = React.InputHTMLAttributes<HTMLInputElement> & {
    date: Date
    bounds: 'start' | 'end'

}

export const EditDate = ({ date: inital, bounds, ...rest }: EditDateProps) => {
    const [date, setDate] = useState(inital)

    const onSelect = (d: Date | undefined) => {
        if (!d) return
        d.setHours(bounds == 'start' ? 0 : 23)
        d.setMinutes(bounds == 'start' ? 0 : 59)
        d.setSeconds(bounds == 'start' ? 0 : 59)
        setDate(d)
    }

    return (
        <>
            <input type="hidden" defaultValue={date.toISOString()} {...rest} />
            <Popover>
                <PopoverTrigger className="h-4 w-4">
                    <CalendarIcon size={16} />
                </PopoverTrigger>
                <PopoverContent>
                    <Calendar
                        mode="single" selected={date} onSelect={onSelect} />
                </PopoverContent>
            </Popover>
        </>
    )
}