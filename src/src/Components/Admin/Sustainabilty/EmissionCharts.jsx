import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const emissionsData = [
  { year: "2022", value: 120, target: 110 },
  { year: "2023", value: 100, target: 90 },
  { year: "2024", value: 85, target: 70 },
  { year: "2025", value: 65, target: 60, projected: true },
];

const categoryData = [
  { name: "Transport", current: 45, previous: 55 },
  { name: "Processing", current: 30, previous: 35 },
  { name: "Packaging", current: 15, previous: 25 },
  { name: "Storage", current: 10, previous: 15 },
];

const EmissionCharts = () => {
  const trendChartRef = useRef(null);
  const categoryChartRef = useRef(null);
  const trendChartInstance = useRef(null);
  const categoryChartInstance = useRef(null);

  useEffect(() => {
    return () => {
      if (trendChartInstance.current) {
        trendChartInstance.current.destroy();
      }
      if (categoryChartInstance.current) {
        categoryChartInstance.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (trendChartRef.current) {
      if (trendChartInstance.current) {
        trendChartInstance.current.destroy();
      }

      const ctx = trendChartRef.current.getContext('2d');
      trendChartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: emissionsData.map(d => d.year),
          datasets: [
            {
              label: 'Actual',
              data: emissionsData.map(d => d.value),
              borderColor: '#10b981',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              borderWidth: 2,
              pointRadius: 4,
              pointHoverRadius: 6,
              tension: 0.1
            },
            {
              label: 'Target',
              data: emissionsData.map(d => d.target),
              borderColor: '#6366f1',
              backgroundColor: 'rgba(99, 102, 241, 0.1)',
              borderWidth: 2,
              borderDash: [5, 5],
              pointRadius: 4,
              tension: 0.1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `${context.dataset.label}: ${context.raw} tCO2e`;
                }
              }
            },
            legend: {
              position: 'bottom'
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Emissions (tCO2e)'
              }
            }
          }
        }
      });
    }

    if (categoryChartRef.current) {
      if (categoryChartInstance.current) {
        categoryChartInstance.current.destroy();
      }

      const ctx = categoryChartRef.current.getContext('2d');
      categoryChartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: categoryData.map(d => d.name),
          datasets: [
            {
              label: 'Previous Year',
              data: categoryData.map(d => d.previous),
              backgroundColor: '#94a3b8',
              barPercentage: 0.6,
              categoryPercentage: 0.8
            },
            {
              label: 'Current Year',
              data: categoryData.map(d => d.current),
              backgroundColor: '#10b981',
              barPercentage: 0.6,
              categoryPercentage: 0.8
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `${context.dataset.label}: ${context.raw} tCO2e`;
                }
              }
            },
            legend: {
              position: 'bottom'
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Emissions (tCO2e)'
              }
            }
          }
        }
      });
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium text-slate-700 mb-4">
          Emissions Trend vs Target
        </h3>
        <div style={{ height: '240px' }}>
          <canvas ref={trendChartRef} />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium text-slate-700 mb-4">
          Emissions by Category
        </h3>
        <div style={{ height: '240px' }}>
          <canvas ref={categoryChartRef} />
        </div>
      </div>
    </div>
  );
};

export default EmissionCharts;