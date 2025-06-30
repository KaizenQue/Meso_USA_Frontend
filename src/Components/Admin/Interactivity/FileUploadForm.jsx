import React, { useContext } from 'react';
import * as XLSX from 'xlsx';
import { DataContext } from './DataContext';

const FileUploadForm = () => {
  const { 
    setProcurementData, 
    setColumns, 
    setDataSource,
    setCurrentPage,
    setChartPage,
    dataSource
  } = useContext(DataContext);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryString = event.target.result;
      const workbook = XLSX.read(binaryString, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const headers = jsonData[0]; 
      const data = jsonData.slice(1).map((row) => {
        const rowData = {};
        headers.forEach((header, index) => {
          rowData[header] = row[index];
        });
        return rowData;
      });

      setColumns(headers); 
      setProcurementData(data); 
      setDataSource('file'); 
      
      setCurrentPage(0);
      setChartPage(0);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Upload Excel File</h2>
      <div className="flex flex-col space-y-4">
        <p className="text-gray-600">Upload an Excel file to import procurement data.</p>
        <label className="flex flex-col items-center px-4 py-6 bg-white rounded-lg border border-dashed border-gray-300 cursor-pointer hover:bg-gray-50">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
          </svg>
          <span className="mt-2 text-sm text-gray-600">Select a file</span>
          <input
            type="file"
            className="hidden"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            disabled={dataSource === 'manual'}
          />
        </label>
      </div>
    </div>
  );
};

export default FileUploadForm;