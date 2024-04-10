'use client'

import { Button } from "@/components/ui/button";
import { pauseActivity, resumeActivity } from "./actions";
import React, { useContext  } from 'react'; 
import { Pause, Play } from "lucide-react";
import { ActivityContext } from './ActivityContext'; // Import ActivityContext


export function PauseResume({ activity }: any) {
    const { isPaused, setIsPaused } = useContext(ActivityContext);
  
    const handleClick = () => {
      if (isPaused) {
        resumeActivity(activity);
        setIsPaused(false);
      } else {
        pauseActivity(activity);
        setIsPaused(true); 
      }
    };
  
    return (
      <div>
        <Button type="button" onClick={handleClick}>
          {isPaused ? <Pause strokeWidth={1.5}/> : <Play strokeWidth={1.5}/>}
        </Button>
      </div>
    );
  }