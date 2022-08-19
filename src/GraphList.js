import React, { useState, useEffect } from 'react';
import LineChart from './LineChart';

export default function GraphList({checkedStreams, from, to}) {
  console.log(checkedStreams)
  return (
      <div>
        {checkedStreams.map((value, index) => {
          console.log(value)
          return (<LineChart key={index} index={index} code_station={value} fromDate={from} toDate={to}/>);
        })}
      </div>
  );
}
