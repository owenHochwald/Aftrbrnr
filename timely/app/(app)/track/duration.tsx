'use client'

import { useState, useEffect } from 'react'

const pad = (n: number) => n.toString().padStart(2, '0')

type Props = {
    startAt: Date
}

export const ActivityDuration = ({startAt}: Props) => {
    const now = new Date()
    const [elapsed, setElapsed] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            const date = new Date(startAt)
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