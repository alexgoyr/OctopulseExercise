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
    const [noDataFound, setNoDataFound] = useState(false)

    useEffect(() => {
        const loadData = async (jsonData) => {
            console.log(jsonData)
            if (jsonData === undefined)
                return
            else if (jsonData.length < 1) {
                setNoDataFound(true)
            }
            try {
                setChartData({
                    labels: jsonData.map((data) => data.date_mesure_temp),
                    datasets: [
                        {
                            label: jsonData.length > 0
                                ? jsonData[0].libelle_station + " (°C)"
                                : "No data found for this period of time " + code_station.to_string,
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
                    + format(fromDate, "yyyy-MM-dd")
                    + '&date_fin_mesure=' + format(toDate, "yyyy-MM-dd");
                    await fetch(requestUrl).then((response) => {
                        response.json().then((json) => {
                            console.log(json)
                            loadData(json.data);
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
                        ? noDataFound
                            ? <h1>No Data for this period of time</h1>
                            :<CircularProgress />
                        : <Line key={code_station} data={chartData} />
                    :null
            }

        </div>
    );
}

/*code_commune: "97418"
code_cours_eau: null
code_parametre: "1301"
code_qualification: "1"
code_station: "10310812"
code_unite: "27"
date_mesure_temp: "2010-09-08"
geometry: {type: "Point", crs: {…}, coordinates: Array(2)}
heure_mesure_temp: "11:00:00"
latitude: -20.969466696
libelle_commune: "Sainte-Marie"
libelle_cours_eau: null
libelle_parametre: "Température de l'Eau"
libelle_qualification: "Correcte"
libelle_station: "La Rivière des Pluies à l'aplomb du piton Tanan"
localisation: "gorge aval Ravine Diable"
longitude: 55.491394165
resultat: 18.666
symbole_unite: "°C"
uri_cours_eau: null
uri_station: "https://id.eaufrance.fr/StationMesureEauxSurface/10310812"
 */