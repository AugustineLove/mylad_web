import React, { useState } from 'react';

const DateInput = ( {onChange} ) => {
  // Initialize with today's date in YYYY-MM-DD format
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);

  return (
    <input
      type="date"
      value={startDate}
      onChange={onChange}
      className="border p-2 rounded w-full"
    />
  );
};

export default DateInput;
