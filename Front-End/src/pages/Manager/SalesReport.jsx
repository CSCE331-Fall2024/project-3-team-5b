import React from 'react';
import { Bar } from 'react-chartjs-2';  
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './SalesReport.css';  

// Register Chart.js modules
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

/**
 * SalesReport Component
 * Displays a bar chart of sales data using Chart.js.
 *
 * This component renders a bar chart that visualizes sales amounts for specific dates.
 * It uses the `react-chartjs-2` library for integrating Chart.js with React.
 *
 * @component
 * @returns {JSX.Element} The rendered SalesReport component.
 */
function SalesReport() {
  /**
   * Static sales data for the report.
   * @type {Array<{date: string, amount: number}>}
   */
  const salesData = [
    { date: '2024-11-01', amount: 100 },
    { date: '2024-11-02', amount: 150 },
    { date: '2024-11-03', amount: 120 },
    { date: '2024-11-04', amount: 180 },
    { date: '2024-11-05', amount: 160 },
  ];

  /**
   * Chart data for the bar chart.
   * Maps the `salesData` into labels and datasets required by Chart.js.
   * @type {Object}
   */
  const chartData = {
    labels: salesData.map((data) => data.date), // Extract dates as labels
    datasets: [
      {
        label: 'Sales Amount ($)', // Label for the dataset
        data: salesData.map((data) => data.amount), // Extract sales amounts
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar fill color
        borderColor: 'rgba(75, 192, 192, 1)', // Bar border color
        borderWidth: 1, // Border width for bars
      },
    ],
  };

  /**
   * Chart options for customization.
   * Configures responsiveness, tooltips, scales, and other settings.
   * @type {Object}
   */
  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Sales Report', // Chart title
      },
      tooltip: {
        mode: 'index', // Tooltip mode
        intersect: false, // Tooltips appear for overlapping data points
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date', // X-axis title
        },
      },
      y: {
        title: {
          display: true,
          text: 'Amount ($)', // Y-axis title
        },
        beginAtZero: true, // Y-axis starts at zero
      },
    },
  };

  return (
    <div className="sales-report-container">
      <h2>Sales Report</h2>
      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} /> 
      </div>
    </div>
  );
}

export default SalesReport;
