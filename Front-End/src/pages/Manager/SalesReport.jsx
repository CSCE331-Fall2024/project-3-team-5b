import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import './SalesReport.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


/**
 * @description A React component that displays a sales report in the form of a bar chart.
 * Allows users to filter the sales data by a custom date range.
 * Displays a bar chart with sales data for the selected date range.
 * Includes a back button to navigate to the previous page.
 *
 * @component
 * @example
 * return <SalesReport />;
 */
function SalesReport() {
    
    const [salesData, setSalesData] = useState([]);

   
    const [filteredSalesData, setFilteredSalesData] = useState([]);


    const [startDate, setStartDate] = useState('');


    const [endDate, setEndDate] = useState('');


    const navigate = useNavigate();

    /**
     * @description Fetches sales data from the server when the component mounts and formats the data.
     * @async
     * @function
     */
    useEffect(() => {
        const fetchSales = async () => {
            try {
                const baseUrl = window.location.hostname === 'localhost'
                    ? 'http://localhost:5000'
                    : import.meta.env.VITE_POS_API_BASE_URL;
                
                const response = await axios.get(`${baseUrl}/api/sales`);

                // Format the date to only show YYYY-MM-DD (remove time)
                const formattedData = response.data.map((sale) => ({
                    date: new Date(sale.sales_date).toLocaleDateString('en-CA'), // YYYY-MM-DD format
                    total_sales: parseFloat(sale.total_sales),
                }));

                setSalesData(formattedData);
                setFilteredSalesData(formattedData); // Initially, show all sales data
            } catch (error) {
                console.error('Error fetching sales data:', error);
            }
        };
        fetchSales();
    }, []);

    /**
     * @description Filters the sales data based on the selected date range (start and end dates).
     * Updates the filtered sales data state to display the filtered results.
     * @function
     */
    const handleDateFilter = () => {
        // Filter the sales data based on the selected date range
        const filtered = salesData.filter((sale) => {
            const saleDate = new Date(sale.date);
            const start = new Date(startDate);
            const end = new Date(endDate);
            return saleDate >= start && saleDate <= end;
        });

        setFilteredSalesData(filtered);
    };

 
    const chartData = {
        labels: filteredSalesData.map((data) => data.date),
        datasets: [
            {
                label: 'Sales Amount ($)',
                data: filteredSalesData.map((data) => data.total_sales),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

 
    const chartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Sales Report',
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date',
                },
                ticks: {
                    autoSkip: true, // Automatically skips some labels if they are too cluttered
                    maxTicksLimit: 10, // Limit the number of ticks (labels)
                },
                grid: {
                    display: false, // Hide grid lines for a cleaner look
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Amount ($)',
                },
                beginAtZero: true,
            },
        },
    };

 
    if (salesData.length === 0) {
        return <p>Loading sales data...</p>;
    }

    return (
        <div className="sales-report-container">
            <h2>Sales Report</h2>

            {/* Back Button */}
            <button onClick={() => navigate(-1)} className="back-button">Back</button>

            {/* Date Range Filters */}
            <div className="date-filter-container">
                <label>Start Date:</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <label>End Date:</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <button onClick={handleDateFilter}>Apply Date Range</button>
            </div>

            <div className="chart-container">
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
}

export default SalesReport;
