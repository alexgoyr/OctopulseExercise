import React, { useState, useEffect } from 'react';
import LineChart from './LineChart';

export default function GraphList({checkedStreams, from, to}) {
    const UserData = [
        {
          id: 1,
          year: 2016,
          userGain: 80000,
          userLost: 823,
        },
        {
          id: 2,
          year: 2017,
          userGain: 45677,
          userLost: 345,
        },
        {
          id: 3,
          year: 2018,
          userGain: 78888,
          userLost: 555,
        },
        {
          id: 4,
          year: 2019,
          userGain: 90000,
          userLost: 4555,
        },
        {
          id: 5,
          year: 2020,
          userGain: 4300,
          userLost: 234,
        },
      ];
  console.log(checkedStreams)
  return (
      <div>
        {checkedStreams.map((value, index) => {
          console.log(value)
          return (<LineChart key={index} index={index} baseData={UserData} code_station={value} fromDate={from} toDate={to}/>);
        })}
      </div>
  );
}
