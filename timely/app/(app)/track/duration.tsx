'use client'

import { pad } from '@/lib/utils'
import { useState, useEffect, useContext } from 'react'
import { ActivityContext } from './ActivityContext'



type ActivityDurationProps = {
    startAt: Date
}

type DisplayDurationProps = {
    displayTime: Date | null | undefined
}

export const ActivityDuration = ({ startAt }: ActivityDurationProps) => {
    const [elapsed, setElapsed] = useState(0);
    const { isPaused } = useContext(ActivityContext);
    const [pausedTime, setPausedTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (isPaused) {
                setPausedTime(elapsed);
            } else {
                setElapsed((prevElapsed) => prevElapsed + 100);
            }
        }, 100);


        return () => {
            clearInterval(interval);
        }
    }, [!isPaused]);

    const totalElapsed = isPaused ? pausedTime : elapsed;
    const hours = Math.floor(totalElapsed / 1000 / 60 / 60);
    const minutes = Math.floor((totalElapsed / 1000 / 60) % 60);
    const seconds = Math.floor((totalElapsed / 1000) % 60);

    return (
        <div className="slashed-zero tabular-nums font-bold">
            {pad(hours)}:{pad(minutes)}:{pad(seconds)}
        </div>
    );
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