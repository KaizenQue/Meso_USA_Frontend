import React from 'react';

const Pagination = ({ 
  currentPage, 
  setCurrentPage, 
  itemsPerPage, 
  setItemsPerPage, 
  totalItems, 
  itemName = "entries" 
}) => {
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(0); 
  };

  return (
    <div className="flex flex-wrap items-center justify-between border-t border-gray-200 pt-4">
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-700">
          Showing {currentPage * itemsPerPage + 1} to{' '}
          {Math.min((currentPage + 1) * itemsPerPage, totalItems)} of{' '}
          {totalItems} {itemName}
        </span>
        
        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-700">Items per page:</label>
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="border border-gray-300 rounded-md py-1 px-2 text-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={200}>200</option>
          </select>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 mt-2 sm:mt-0">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
          className={`px-3 py-1 rounded-md text-sm font-medium ${
            currentPage === 0
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">
          Page {currentPage + 1} of {Math.ceil(totalItems / itemsPerPage)}
        </span>
        <button
          onClick={handleNextPage}
          disabled={(currentPage + 1) * itemsPerPage >= totalItems}
          className={`px-3 py-1 rounded-md text-sm font-medium ${
            (currentPage + 1) * itemsPerPage >= totalItems
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;