import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const SeasonalTrends = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    
    const labels = data.map(item => item.month);
    const riceData = data.map(item => item.rice);
    const wheatData = data.map(item => item.wheat);
    const cornData = data.map(item => item.corn);
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Rice',
            data: riceData,
            backgroundColor: '#8884d8',
            stack: 'Stack 0', 
          },
          {
            label: 'Wheat',
            data: wheatData,
            backgroundColor: '#82ca9d',
            stack: 'Stack 0', 
          },
          {
            label: 'Corn',
            data: cornData,
            backgroundColor: '#ffc658',
            stack: 'Stack 0', 
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          }
        },
        scales: {
          y: {
            beginAtZero: true, 
            stacked: true, 
            grid: {
              drawBorder: false
            }
          },
          x: {
            stacked: true, 
            grid: {
              display: false
            }
          }
        }
      }
    });
    
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default SeasonalTrends;