import React, { useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import mockData from "../../../MockData.json";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const generateGradient = (ctx, chartArea, color1, color2) => {
  const gradient = ctx.createLinearGradient(
    0,
    chartArea.bottom,
    0,
    chartArea.top
  );
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);
  return gradient;
};

const extractData = (selectedYear, selectedCountry) => {
  if (!selectedYear || !selectedCountry) {
    return { labels: [], datasets: [] };
  }

  const suppliers =
    mockData.yearly_data[selectedYear].country[selectedCountry].regions.North
      .suppliers;

  const months = suppliers[0].procurement_KPIs.delivery_delay.monthly.map(
    (m) => m.month
  );

  const datasets = suppliers.map((supplier) => ({
    label: supplier.name,
    data: supplier.procurement_KPIs.delivery_delay.monthly.map((m) => m.delay_days),
    borderWidth: 2,
    fill: true,
    tension: 0.4,
  }));

  return { labels: months, datasets };
};

const DeliveryDelayChart = ({ selectedYear, selectedCountry }) => {
  const chartRef = useRef(null);
  const chartData = extractData(selectedYear, selectedCountry);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.ctx;
      const chartArea = chartRef.current.chartArea;

      const fixedColors = [
        { color1: 'red', color2: 'rgba(75, 192, 192, 0.2)' }, 
        { color1: 'green', color2: 'rgba(153, 102, 255, 0.2)' },
        { color1: 'purple', color2: 'rgba(255, 159, 64, 0.2)' }, 
      ];

      chartData.datasets = chartData.datasets.map((dataset, index) => {
        const colors = fixedColors[index % fixedColors.length]; 
        return {
          ...dataset,
          backgroundColor: generateGradient(ctx, chartArea, colors.color1, colors.color2)
        };
      });
    }
  }, [chartData]);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: "Delay in Days",
        },
        grid: {
          display: false,
        },
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="mb-1">
        <div className="text-2xl font-semibold">Monthly Delivery Delay</div>
        <div className="text-sm text-red-500">+20% vs last year</div>
      </div>
      <div style={{ width: "100%", margin: "0 auto" }}>
        <Line ref={chartRef} data={chartData} options={options} />
      </div>
    </div>
  );
};

export default DeliveryDelayChart;