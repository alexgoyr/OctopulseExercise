import React from 'react';
import LineChart from './LineChart';

export default function GraphList({checkedStreams, from, to}) {
  return (
      <div>
        {checkedStreams.map((value, index) => {
          return (<LineChart key={index} index={index} code_station={value} fromDate={from} toDate={to}/>);
        })}
      </div>
  );
}
