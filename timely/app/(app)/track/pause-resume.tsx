'use client'

import { Button } from "@/components/ui/button";
import { pauseActivity, resumeActivity } from "./actions";
import React, { useState } from 'react'; 
import { Pause, Play } from "lucide-react";


export function PauseResume({ activity }: any) {
    const [isPaused, setIsPaused] = useState(activity?.paused || false);
  
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
          {isPaused ? <Play strokeWidth={1.5}/> : <Pause strokeWidth={1.5}/>}
        </Button>
      </div>
    );
  }