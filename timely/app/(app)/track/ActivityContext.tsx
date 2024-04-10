"use client"
import React, { createContext, useState } from 'react';

interface ActivityContextValue {
    isPaused: boolean;
    setIsPaused: (isPaused: boolean) => void;
}

export const ActivityContext = createContext<ActivityContextValue>({
    isPaused: false,
    setIsPaused: () => { },
});

export const ActivityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isPaused, setIsPaused] = useState(false);

    return (
        <ActivityContext.Provider value={{ isPaused, setIsPaused }}>
            {children}
        </ActivityContext.Provider>
    );
};
