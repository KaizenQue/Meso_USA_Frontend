import React, { useContext } from 'react';
import { DataContext } from './DataContext';

const AddDataForm = () => {
  const { 
    supplier, 
    setSupplier, 
    volume, 
    setVolume, 
    handleAddData, 
    dataSource 
  } = useContext(DataContext);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Add Procurement Data</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">X-Axis</label>
          <input
            type="text"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            disabled={dataSource === 'file'}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Y-Axis</label>
          <input
            type="number"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            disabled={dataSource === 'file'}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleAddData}
          disabled={dataSource === 'file'}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Data
        </button>
      </div>
    </div>
  );
};

export default AddDataForm;