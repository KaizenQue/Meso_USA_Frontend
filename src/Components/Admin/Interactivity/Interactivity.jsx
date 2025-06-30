
import React, { useContext } from 'react';
import { DataProvider, DataContext } from './DataContext';
import ChartSection from './ChartSection';
import DataEntrySection from './DataEntrySection';
import DataTable from './DataTable';

const ResetButton = () => {
  const { handleReset } = useContext(DataContext);
  
  return (
    <div className="flex justify-end mb-6">
      <button
        onClick={handleReset}
        className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
      >
        Reset
      </button>
    </div>
  );
};

const ProcurementDashboard = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Procurement Overview</h1>
      <ChartSection />
      <DataEntrySection />
      <ResetButton />
      <DataTable />
    </div>
  );
};

const Interactivity = () => {
  return (
    <DataProvider>
      <ProcurementDashboard />
    </DataProvider>
  );
};

export default Interactivity;
