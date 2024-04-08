'use client'

import { Button } from "@/components/ui/button";
import { NewActivityProps } from "./page";
import { pauseActivity, resumeActivity } from "./actions";


export function PauseResume({ activity }: any) {
    return (
        <div>
            <Button type="button" onClick={() => {activity?.paused ? resumeActivity(activity) : pauseActivity(activity)}}>{activity?.paused ? "Resume" : "Pause"}</Button>

            {/* <Button type="button" onClick={() => pauseActivity(activity)}>Pause</Button> */}
            {/* <Button type="button" onClick={() => resumeActivity(activity)}>Resume</Button> */}
        </div>


        // <Button >{activity?.paused ? "Resume" : "Pause"}</Button>

    )
}

