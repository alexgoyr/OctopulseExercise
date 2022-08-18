import React, { useState, useEffect } from 'react';
import { Line } from "react-chartjs-2";
import CircularProgress from '@mui/material/CircularProgress';
import { Chart as ChartJS } from "chart.js/auto";
import { format } from "date-fns";

export default function LineChart({index, baseData, fromDate, toDate, code_station}) {

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

        const fetchStreamTemperature = async () => {
            console.log(fromDate)
            console.log(toDate)
            if (fromDate !== undefined && toDate !== undefined)
                try {
                    const requestUrl = 'https://hubeau.eaufrance.fr/api/v1/temperature/chronique?code_station='+ code_station
                    + '&date_debut_mesure='
                    + format(fromDate, "yyyy_MM_dd")
                    + '&date_fin_mesure=' + format(toDate, "yyyy_MM_dd");
                    await fetch(requestUrl).then((response) => {
                        response.json().then((json) => {
                            console.log(json)
                            //setStreamList(json.data)
                        })
                    }).catch(error => {
                        console.log(error);
                    });
                } catch (e) {
                    console.log(e)
                }
        }

        //console.log(elemsToShow)
        fetchStreamTemperature();
        loadData();
    }, [index, baseData, code_station, fromDate, toDate])

    return (
        <div>
            {
                fromDate !== undefined && toDate !== undefined ?
                    chartData.labels.length === 0
                        ? <CircularProgress />
                        : <Line key={code_station} data={chartData} />
                        :null
            }

        </div>
    );
}