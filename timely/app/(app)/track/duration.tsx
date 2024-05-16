'use client'

import { pad } from '@/lib/utils'
import { useStopwatch } from 'react-timer-hook';
import { Button } from '@/components/ui/button';
import { Pause, Play } from 'lucide-react';


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


    return (
        <div className='flex items-center space-x-4'>
            <div className="slashed-zero tabular-nums font-bold">
                {pad(hours)}:{pad(minutes)}:{pad(seconds)}
            </div>
            <div className='flex space-x-3'>
                {isRunning ? (
                    <Button type="button" onClick={pause}>
                        <Pause strokeWidth={1.5} />
                    </Button>
                ) : (
                    <Button type="button" onClick={start}>
                        <Play strokeWidth={1.5} />
                    </Button>
                )}
            </div>
        </div>
    );
}