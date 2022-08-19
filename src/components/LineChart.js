import React, { useState, useEffect } from 'react';
import { Line } from "react-chartjs-2";
import CircularProgress from '@mui/material/CircularProgress';
// eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";
import { format } from "date-fns";

export default function LineChart({index, fromDate, toDate, code_station}) {

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });
    const [noDataFound, setNoDataFound] = useState(false)
    const [error, setError] = useState("")

    const raiseError = async(bool, error) => {
        setNoDataFound(true);
        setChartData({
            labels: [],
            datasets: [],
        });
        setError(error);
    }
    useEffect(() => {
        const loadData = async (jsonData) => {
            if (jsonData.length < 1) {
                raiseError(true, "No data for this period of time");
                return;
            }
            try {
                setChartData({
                    labels: jsonData.map((data) => data.date_mesure_temp),
                    datasets: [
                        {
                            label: jsonData[0].libelle_station + " (°C)",
                            data: jsonData.map((data) => data.resultat),
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
                console.log(e);
            }
        }

        const fetchStreamTemperature = async () => {
            if (fromDate !== undefined && toDate !== undefined)
                try {
                    const requestUrl = 'https://hubeau.eaufrance.fr/api/v1/temperature/chronique?code_station='+ code_station
                    + '&date_debut_mesure='
                    + format(fromDate, "yyyy-MM-dd")
                    + '&date_fin_mesure=' + format(toDate, "yyyy-MM-dd");
                    await fetch(requestUrl).then((response) => {
                        response.json().then((json) => {
                            if (json.data === undefined)
                                if (json.message !== undefined && json.code !== undefined)
                                    raiseError(true, "Error, Cannot get data : " + json.code + ". " + json.message );
                                else
                                    raiseError(true, "Error, Cannot get data");
                            else
                                loadData(json.data);
                        })
                    }).catch(error => {
                        raiseError(true, "Failed to fetch : " + error);
                        console.log(error);
                    });
                } catch (e) {
                    raiseError(true, "Couldn't get data : " + e);
                    console.log(e)
                }
        }
        fetchStreamTemperature();
    }, [index, code_station, fromDate, toDate])

    return (
        <div>
            {
                fromDate !== undefined && toDate !== undefined ?
                    chartData.labels.length === 0
                        ? noDataFound
                            ? error.length > 0
                                ? <h1>{error}</h1>
                                : <h1>No data found for this time period</h1>
                            :<CircularProgress />
                        : <Line key={code_station} data={chartData} />
                    :null
            }

        </div>
    );
}