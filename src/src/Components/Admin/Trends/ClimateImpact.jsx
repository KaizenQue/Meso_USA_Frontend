import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ClimateImpact = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    
    const labels = data.map(item => item.month);
    const droughtData = data.map(item => item.drought);
    const floodData = data.map(item => item.flood);
    const extremeTempData = data.map(item => item.extreme_temp);
    
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Drought',
            data: droughtData,
            backgroundColor: '#FF8042',
            borderColor: '#FF8042',
            borderWidth: 1
          },
          {
            label: 'Flood',
            data: floodData,
            backgroundColor: '#0088FE',
            borderColor: '#0088FE',
            borderWidth: 1
          },
          {
            label: 'Extreme Temperature',
            data: extremeTempData,
            backgroundColor: '#FFBB28',
            borderColor: '#FFBB28',
            borderWidth: 1
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
            grid: {
              drawBorder: false
            },
            title: {
              display: true,
              text: 'Impact Severity Index'
            }
          },
          x: {
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

export default ClimateImpact;