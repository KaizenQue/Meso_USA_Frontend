import React from 'react';

const TimeRangeSelector = ({ timeRange, handleTimeRangeChange }) => {
  return (
    <div className="flex gap-4 mb-6">
      <button 
        className={`px-4 py-2 rounded-md ${timeRange === 'quarter' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
        onClick={() => handleTimeRangeChange('quarter')}
      >
        Last Quarter
      </button>
      <button 
        className={`px-4 py-2 rounded-md ${timeRange === 'year' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
        onClick={() => handleTimeRangeChange('year')}
      >
        Last Year
      </button>
      <button 
        className={`px-4 py-2 rounded-md ${timeRange === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
        onClick={() => handleTimeRangeChange('all')}
      >
        All Time
      </button>
    </div>
  );
};

export default TimeRangeSelector;