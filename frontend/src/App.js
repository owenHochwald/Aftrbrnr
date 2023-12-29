import { useEffect } from 'react';

import React from 'react';
import './App.css'
import SearchIcon from './search.svg'

const App = () => {


    useEffect(() => {

    }, []);

    return (
        <div className="app">
            <h1>Timely</h1>

            <div className="search">
                <input
                    placeholder='Search for something'
                    value='Where do I find this?'
                    // implement state later
                    onChange={() => {}}
                 />
                <img 
                    src={SearchIcon}
                    alt='search'
                    // implement so it calls a function that uses the text in the bar to search
                    onClick={() => {}}
                />
            </div>

            <div className='container'>
                <div className='button'>
                    {/* <button
                        onClick={() => {}}
                    >
                        <h1>Start Timer</h1>
                    </button> */}
                    <h1>Start Timer</h1>
                </div>
                <div className='button'>
                    {/* <button
                        onClick={() => {}}
                    >
                        <h1>Start Timer</h1>
                    </button> */}
                    <h1>Pause Timer</h1>
                </div>
            </div>
        </div>
        )
}

export default App;