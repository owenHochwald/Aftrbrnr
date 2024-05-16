'use client'

import { Button } from "@/components/ui/button";
import { pauseActivity, resumeActivity } from "./actions";
import React, { useContext  } from 'react'; 
import { Pause, Play } from "lucide-react";
import { ActivityContext } from './ActivityContext'; // Import ActivityContext


export function PauseResume({ activity }: any) {
  
    const { isPaused, setIsPaused } = useContext(ActivityContext);
    console.log(isPaused)
  
    const handleClick = () => {
      if (isPaused) {
        resumeActivity(activity);
        setIsPaused(false);
        console.log(isPaused)

      } else {
        pauseActivity(activity);
        setIsPaused(true); 
        console.log(isPaused)
      }
    };
  
    return (
      <div>
        <Button type="button" onClick={handleClick}>
          {!isPaused ? <Play strokeWidth={1.5}/> : <Pause strokeWidth={1.5}/>}
        </Button>
      </div>
    );
  }