import React, { useContext } from 'react';
import { DataContext } from './DataContext';
import Pagination from './Pagination';

const DataTable = () => {
  const {
    procurementData,
    columns,
    paginatedTableData,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    requestSort,
    sortConfig,
    handleEditData,
    handleDeleteData,
    handleSaveEdit,
    editingIndex,
    updateData
  } = useContext(DataContext);

  if (procurementData.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort(column)}
                >
                  {column}
                  {sortConfig.key === column && (
                    <span className="ml-1">
                      {sortConfig.direction === 'asc' ? '▲' : '▼'}
                    </span>
                  )}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedTableData.map((item, index) => {
              const actualIndex = index + currentPage * itemsPerPage;
              return (
                <tr key={index} className="hover:bg-gray-50">
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                      {editingIndex === actualIndex ? (
                        <input
                          type="text"
                          value={item[column]}
                          onChange={(e) => updateData(actualIndex, column, e.target.value)}
                          className="border border-gray-300 rounded px-2 py-1 w-full"
                        />
                      ) : (
                        <span className="text-sm text-gray-900">{item[column]}</span>
                      )}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {editingIndex === actualIndex ? (
                      <button
                        onClick={handleSaveEdit}
                        className="text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md font-medium text-sm"
                      >
                        Save
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditData(actualIndex)}
                          className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md font-medium text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteData(actualIndex)}
                          className="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md font-medium text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          totalItems={procurementData.length}
          itemName="entries"
        />
      </div>
    </div>
  );
};

export default DataTable;