// src/pages/Home.js

import React from 'react';
import Timer from '../components/Timer/Timer.js';
import TimeEntryForm from '../components/TimeEntryForm/TimeEntryForm.js';

const Home = () => {
  const handleCreateEntry = (newEntry) => {
    // Send newEntry to backend for creation
    console.log('Creating Time Entry:', newEntry);
  };

  return (
    <div>
      <h1>Home Page</h1>
      <Timer />
      <TimeEntryForm onCreateEntry={handleCreateEntry} />
      {/* Additional components and UI elements */}
    </div>
  );
};

export default Home;
