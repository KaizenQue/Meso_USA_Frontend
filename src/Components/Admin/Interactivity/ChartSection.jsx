import React, { useContext, useRef, useEffect } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { DataContext } from './DataContext';
import Pagination from './Pagination';

Chart.register(...registerables);

const ChartSection = () => {
  const {
    chartType,
    setChartType,
    columns,
    xAxis,
    setXAxis,
    yAxis,
    setYAxis,
    procurementData,
    paginatedChartData,
    chartPage,
    setChartPage,
    chartItemsPerPage,
    setChartItemsPerPage,
  } = useContext(DataContext);

  const chartRef = useRef(null);

  const applyGradient = (chartInstance) => {
    if (chartInstance && chartInstance.ctx) {
      const ctx = chartInstance.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, '#0039a6'); 
      gradient.addColorStop(1, '#7CB9E8'); 
      chartInstance.data.datasets[0].backgroundColor = gradient;
      chartInstance.update(); 
    }
  };

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = chartRef.current;
      applyGradient(chartInstance);
    }
  }, [paginatedChartData, xAxis, yAxis, chartType]);

  const chartData = {
    labels: paginatedChartData.map((item) => item[xAxis]),
    datasets: [
      {
        label: yAxis,
        data: paginatedChartData.map((item) => item[yAxis]),
        backgroundColor: 'rgba(75, 192, 192, 0.2)', 
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return <Bar ref={chartRef} data={chartData} options={options} />;
      case 'pie':
        return <Pie ref={chartRef} data={chartData} options={options} />;
      case 'line':
        return <Line ref={chartRef} data={chartData} options={options} />;
      default:
        return <Bar ref={chartRef} data={chartData} options={options} />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Chart Type</label>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="bar">Bar Chart</option>
            <option value="pie">Pie Chart</option>
            <option value="line">Line Chart</option>
          </select>
        </div>

        {columns.length > 0 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">X-Axis</label>
              <select
                value={xAxis}
                onChange={(e) => setXAxis(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {columns.map((column, index) => (
                  <option key={index} value={column}>
                    {column}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Y-Axis</label>
              <select
                value={yAxis}
                onChange={(e) => setYAxis(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {columns.map((column, index) => (
                  <option key={index} value={column}>
                    {column}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
      </div>

      <div className="h-64 md:h-80 mb-4">
        {renderChart()}
      </div>

      {procurementData.length > chartItemsPerPage && (
        <Pagination
          currentPage={chartPage}
          setCurrentPage={setChartPage}
          itemsPerPage={chartItemsPerPage}
          setItemsPerPage={setChartItemsPerPage}
          totalItems={procurementData.length}
          itemName="entries in chart"
        />
      )}
    </div>
  );
};

export default ChartSection;