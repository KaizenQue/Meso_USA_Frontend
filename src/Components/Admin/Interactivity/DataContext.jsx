import React, { createContext, useState, useMemo } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [procurementData, setProcurementData] = useState([]);
  const [supplier, setSupplier] = useState('');
  const [volume, setVolume] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [chartType, setChartType] = useState('bar');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [columns, setColumns] = useState([]);
  const [xAxis, setXAxis] = useState('supplier');
  const [yAxis, setYAxis] = useState('volume');
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [chartPage, setChartPage] = useState(0);
  const [chartItemsPerPage, setChartItemsPerPage] = useState(10);
  const [dataSource, setDataSource] = useState(null);

  const sortedData = useMemo(() => {
    let sortableData = [...procurementData];
    if (sortConfig.key !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [procurementData, sortConfig]);

  const paginatedTableData = useMemo(() => {
    return sortedData.slice(
      currentPage * itemsPerPage, 
      (currentPage + 1) * itemsPerPage
    );
  }, [sortedData, currentPage, itemsPerPage]);

  const paginatedChartData = useMemo(() => {
    return sortedData.slice(
      chartPage * chartItemsPerPage, 
      (chartPage + 1) * chartItemsPerPage
    );
  }, [sortedData, chartPage, chartItemsPerPage]);

  const handleReset = () => {
    setProcurementData([]);
    setSupplier('');
    setVolume('');
    setEditingIndex(null);
    setChartType('bar');
    setSortConfig({ key: null, direction: 'asc' });
    setColumns([]);
    setXAxis('supplier');
    setYAxis('volume');
    setCurrentPage(0);
    setItemsPerPage(50);
    setChartPage(0);
    setChartItemsPerPage(10);
    setDataSource(null);
  };

  const handleAddData = () => {
    if (supplier && volume) {
      const newData = { supplier, volume: parseInt(volume) };
      setProcurementData([...procurementData, newData]);
      setSupplier('');
      setVolume('');
      setDataSource('manual');

      if (columns.length === 0) {
        setColumns(['supplier', 'volume']);
      }
    } else {
      alert('Please fill in both supplier and volume fields.');
    }
  };

  const handleDeleteData = (index) => {
    const updatedData = procurementData.filter((_, i) => i !== index);
    setProcurementData(updatedData);
  };

  const handleEditData = (index) => {
    setEditingIndex(index);
  };

  const handleSaveEdit = () => {
    setEditingIndex(null);
  };

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const updateData = (index, column, value) => {
    const updatedData = [...procurementData];
    updatedData[index][column] = value;
    setProcurementData(updatedData);
  };

  return (
    <DataContext.Provider
      value={{
        procurementData,
        setProcurementData,
        supplier,
        setSupplier,
        volume,
        setVolume,
        editingIndex,
        setEditingIndex,
        chartType,
        setChartType,
        sortConfig,
        setSortConfig,
        columns,
        setColumns,
        xAxis,
        setXAxis,
        yAxis,
        setYAxis,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        setItemsPerPage,
        chartPage,
        setChartPage,
        chartItemsPerPage,
        setChartItemsPerPage,
        dataSource,
        setDataSource,
        sortedData,
        paginatedTableData,
        paginatedChartData,
        handleReset,
        handleAddData,
        handleDeleteData,
        handleEditData,
        handleSaveEdit,
        requestSort,
        updateData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};