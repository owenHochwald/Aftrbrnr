'use client'

import { pad } from '@/lib/utils'
import { useState, useEffect } from 'react'


type ActivityDurationProps = {
    startAt: Date
}

type DisplayDurationProps = {
    displayTime: Date | null| undefined
}

export const ActivityDuration = ({ startAt }: ActivityDurationProps) => {
    const now = new Date()
    const [elapsed, setElapsed] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            const elapsed = now.getTime() - startAt.getTime()
            setElapsed(elapsed)
        }, 100)
        return () => clearInterval(interval)
    })

    const hours = Math.floor(elapsed / 1000 / 60 / 60)
    const minutes = Math.floor((elapsed / 1000 / 60) % 60)
    const seconds = Math.floor((elapsed / 1000) % 60)

    return (
        <div className="slashed-zero tabular-nums font-bold">
            {pad(hours)}:{pad(minutes)}:{pad(seconds)}
        </div>
    )
}

export const DisplayDuration = ({ displayTime }: DisplayDurationProps) => {
    if (displayTime === undefined || displayTime === null) return null
    const hours = displayTime.getHours()
    const minutes = displayTime.getMinutes()
    const seconds = displayTime.getSeconds()


    return (
        <div className="slashed-zero tabular-nums font-bold">
            {pad(hours)}:{pad(minutes)}:{pad(seconds)}
        </div>
    )
}