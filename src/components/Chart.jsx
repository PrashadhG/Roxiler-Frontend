import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import 'react-loading-skeleton/dist/skeleton.css';
import '../Styles/Chart.css';

const Chart = () => {
    const [barChartData, setBarChartData] = useState(null);
    const [pieChartData, setPieChartData] = useState(null);
    const [error, setError] = useState(null);
    const [month, setMonth] = useState('03');

    useEffect(() => {
        fetchStatistics(month);
    }, [month]);

    const fetchStatistics = async (month) => {
        try {
            const response = await axios.get(`https://roxiler-backend-6el1.onrender.com/api/combined/${month}`);
            setBarChartData(formatBarChartData(response.data.barChartData));
            setPieChartData(formatPieChartData(response.data.pieChartData));
        } catch (error) {
            setError(error.message);
        }
    };

    const formatBarChartData = (data) => {
        return {
            labels: data.map(item => item.range),
            datasets: [
                {
                    label: 'Number of Items',
                    data: data.map(item => item.count),
                    backgroundColor: 'rgb(52, 52, 252, 0.4)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        };
    };

    const formatPieChartData = (data) => {
        return {
            labels: data.map(item => item.category),
            datasets: [
                {
                    label: 'Count',
                    data: data.map(item => item.count),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        };
    };

    const handleMonthChange = (e) => {
        setMonth(e.target.value);
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='chart-container'>
            <div className='chart-first-container'>
                <div className='chart-title'><h1>Analysis</h1></div>
                <div className='chart-month-dropdown'>
                    <label htmlFor='month'>Select the Month: </label>
                    <select id='month' value={month} onChange={handleMonthChange}>
                        <option value="01">January</option>
                        <option value="02">February</option>
                        <option value="03">March</option>
                        <option value="04">April</option>
                        <option value="05">May</option>
                        <option value="06">June</option>
                        <option value="07">July</option>
                        <option value="08">August</option>
                        <option value="09">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>
                </div>
            </div>
            <div className='chart-second-container'>
                {barChartData && (
                    <div className='bar-chart'>
                        <Bar
                            data={barChartData}
                            options={{
                                plugins: { legend: { display: false } },
                                scales: {
                                    y: {
                                        ticks: {
                                            stepSize: 1,
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                )}
               {pieChartData && (
                    <div className='pie-chart'>
                        <Pie
                            data={pieChartData}
                            options={{
                                plugins: {
                                    legend: {
                                        display: true,
                                        labels: {
                                            boxWidth: 10, 
                                            boxHeight: 10,
                                            font: {
                                                size: 10, 
                                            },
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chart;
