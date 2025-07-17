import React from 'react';
import AddDataForm from './AddDataForm';
import FileUploadForm from './FileUploadForm';

const DataEntrySection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <AddDataForm />
      <FileUploadForm />
    </div>
  );
};

export default DataEntrySection;