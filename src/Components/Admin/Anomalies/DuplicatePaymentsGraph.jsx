import React from 'react';
import mockData from "../../../MockData.json";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const DuplicatePaymentChart = ({ selectedYear, selectedCountry }) => {
  if (!selectedYear || !selectedCountry) {
    return <div>Please select a year and country to view data.</div>;
  }

  const suppliers = mockData.yearly_data[selectedYear].country[selectedCountry].regions.North.suppliers;

  const supplierWithDuplicatePayments = suppliers.find(supplier =>
    supplier.procurement_KPIs.duplicate_payment?.payment_history
  );
  if (!supplierWithDuplicatePayments) {
    return <div>No duplicate payment data available for the selected year and country.</div>;
  }

  const paymentHistory = supplierWithDuplicatePayments.procurement_KPIs.duplicate_payment.payment_history;
  const months = paymentHistory.map(item => item.month);
  const amounts = paymentHistory.map(item => parseInt(item.amount.replace('$', '').replace(',', '')));
  const amounts2 = paymentHistory.map(item => item.amount2 ? parseInt(item.amount2.replace('$', '').replace(',', '')) : null).filter(amount => amount !== null);

  const allAmounts = [...amounts, ...amounts2];

  const backgroundColors = months.map(month => {
    const monthData = paymentHistory.find(item => item.month === month);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let gradient;

    if (monthData.amount2) {
      gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, '#E01C34');
      gradient.addColorStop(1, 'rgba(255, 99, 132, 0.2)');
    } else {
      gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, '#722AE6');
      gradient.addColorStop(1, '#F8CEEC');
    }

    return gradient;
  });

  const chartData = {
    labels: months,
    datasets: [
      {
        label: 'Successful Payment',
        data: allAmounts,
        borderColor: 'red',
        backgroundColor: backgroundColors,
        fill: true,
        barThickness: 30,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const month = tooltipItem.label;
            const amount = tooltipItem.raw;
            const monthData = paymentHistory.find(item => item.month === month);

            if (monthData.amount2 && amount === parseInt(monthData.amount.replace('$', '').replace(',', ''))) {
              return `Payment 1: ${monthData.amount} | Payment 2: ${monthData.amount2}`;
            }
            return `$${amount}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="mb-1">
        <div className="text-2xl font-semibold">30% Detected</div>
        <div className="text-sm text-red-500">+20% vs last year</div>
      </div>
      
      <div style={{ width: "100%", margin: "0 auto" }}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default DuplicatePaymentChart;