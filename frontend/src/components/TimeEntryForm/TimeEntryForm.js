// src/components/TimeEntryForm.js

import React, { useState } from 'react';

const TimeEntryForm = ({ onCreateEntry }) => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [projectId, setProjectId] = useState('');
  const [billable, setBillable] = useState(false);

  const handleCreateEntry = () => {
    const newEntry = {
      startTime,
      endTime,
      projectId,
      billable,
    };

    // Additional validation logic can be added here

    onCreateEntry(newEntry);
  };

  return (
    <div>
      {/* Form input fields and UI components */}
      <button onClick={handleCreateEntry}>Create Time Entry</button>
    </div>
  );
};

export default TimeEntryForm;