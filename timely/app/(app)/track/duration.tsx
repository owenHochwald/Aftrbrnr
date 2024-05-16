'use client'

import { pad } from '@/lib/utils'
import { useStopwatch } from 'react-timer-hook';
import { Button } from '@/components/ui/button';
import { Pause, Play } from 'lucide-react';
import { pauseActivity, resumeActivity } from './actions';


export function Stopwatch({ activity }: any) {
    const {
        totalSeconds,
        seconds,
        minutes,
        hours,
        isRunning,
        start,
        pause,
    } = useStopwatch({ autoStart: true });

    const handlePause = async () => {
        await pauseActivity(activity); 
        pause(); 
    };

    const handleStart = async () => {
        console.log(activity)
        await resumeActivity(activity); 
        start(); 
    };

    

    return (
        <div className='flex items-center space-x-4'>
            <div className="slashed-zero tabular-nums font-bold">
                {pad(hours)}:{pad(minutes)}:{pad(seconds)}
            </div>
            <div className='flex space-x-3'>
                {isRunning ? (
                    <Button type="button" onClick={handlePause}>
                        <Pause strokeWidth={1.5} />
                    </Button>
                ) : (
                    <Button type="button" onClick={handleStart}>
                        <Play strokeWidth={1.5} />
                    </Button>
                )}
            </div>
        </div>
    );
}