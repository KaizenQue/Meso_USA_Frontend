import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#a4de6c', '#d0ed57'];

const formatCurrency = (value) => {
  return `$${value.toFixed(2)}`;
};

const SpendByCategoryChart = ({ categoryData }) => {
  const data = {
    labels: categoryData.map((entry) => entry.name),
    datasets: [
      {
        label: 'Spend',
        data: categoryData.map((entry) => entry.value),
        backgroundColor: COLORS,
        borderColor: COLORS,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y', 
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.raw || 0;
            return `${label}: ${formatCurrency(value)}`;
          },
        },
      },
      legend: {
        display: false, 
      },
    },
    scales: {
      x: {
        type: 'linear',
        ticks: {
          callback: (value) => {
            return Math.ceil(value * 1000) / 1000; 
          },
        },
      },
      y: {
        type: 'category',
        beginAtZero: true,
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Spend by Category</h3>
      <div className="h-64">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default SpendByCategoryChart;