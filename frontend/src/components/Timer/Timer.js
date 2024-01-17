// src/components/Timer.js

import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [running, setRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const startTimer = () => {
    setStartTime(new Date());
    setRunning(true);
  };

  const stopTimer = () => {
    setEndTime(new Date());
    setRunning(false);
  };

  useEffect(() => {
    // Calculate elapsed time for display
    const elapsedTime = endTime ? (endTime - startTime) / 1000 : 0;
    console.log(`Elapsed Time: ${elapsedTime} seconds`);
  }, [startTime, endTime]);

  return (
    <div>
      <div>{running ? 'Running' : 'Not Running'}</div>
      <button onClick={startTimer}>Start Timer</button>
      <button onClick={stopTimer}>Stop Timer</button>
    </div>
  );
};

export default Timer;





// import React, { useEffect, useState } from 'react';
// import './timer.css'

// const Timer = () => {

//     const [seconds, setSeconds] = useState(0);
//     const [minutes, setMinutes] = useState(0);

//     var timer;
//     useEffect(() => {
//         timer = setInterval(() => {
//             setSeconds(seconds + 1);

//             if(seconds === 59){
//                 setMinutes(minutes + 1);
//                 setSeconds(0);
//             }
//         },1000)
//     return () => clearInterval(timer);
//     });
    
//     const restart = () => {
//         setSeconds(0);
//         setMinutes(0);
//     }

//     const stop = () => {
//         clearInterval(timer);
//     }

//     const start = () => {
//         timer = setInterval(() => {
//             setSeconds(seconds + 1);
//         },1000)
//     }


//     // for the Timer component
//     return (
//         <div className="timer">
//             <div className='container'>
//                 <div className="timer_container">
//                     <h1>Let's Get Working!</h1>
//                     <h1>{minutes<10 ? "0" + `${minutes}` : minutes}:{seconds<10 ? "0"+`${seconds}` : seconds}</h1>

//                     <button className="restart" onClick={restart}>Restart</button>
//                     <button className="stop" onClick={stop}>Stop</button>
//                     <button className="start" onClick={start}>Start</button>

//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Timer;