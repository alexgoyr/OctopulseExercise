import React, { useState, useEffect } from 'react';
import { Line } from "react-chartjs-2";
import CircularProgress from '@mui/material/CircularProgress';
import { Chart as ChartJS } from "chart.js/auto";

export default function LineChart({baseData, from, to, code_station}) {

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });

    useEffect(() => {
        
        const loadData = async () => {
            try {
                setChartData({
                    labels: baseData.map((data) => data.year),
                    datasets: [
                        {
                            label: "Users Gained",
                            data: baseData.map((data) => data.userGain),
                            backgroundColor: [
                                "rgba(75,192,192,1)",
                                "#ecf0f1",
                                "#50AF95",
                                "#f3ba2f",
                                "#2a71d0",
                            ],
                            borderColor: "black",
                            borderWidth: 2,
                        },
                    ],
                });
            } catch (e) {
                console.log(e)
            }
        }
        loadData();
    }, [baseData])
      
    return (
        <div>
            {chartData.labels.length === 0
                ? <CircularProgress />
                : <Line data={chartData} />}

        </div>
    );
}