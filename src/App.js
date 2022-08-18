import React, {useState, useEffect } from 'react';
import './App.css';
import StreamList from './StreamList'
import GraphList from './GraphList'
import DateSelecter from './DateSelecter'
import { useInView } from 'react-intersection-observer';
import CircularProgress from '@mui/material/CircularProgress';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

import Drawer from '@mui/material/Drawer';
function App() {
  const [streamList, setStreamList] = useState([]);
  const [checked, setChecked] = useState([]);
  const [elemsToShow, setElemsToShow] = useState(20);
  const [furtherLoading, setFurtherLoading] = useState(false);
  const [fromDate, setFromDate] = React.useState(undefined);
  const [toDate, setToDate] = React.useState(undefined);
  const [ref, inView] = useInView();

  useEffect(() => {
    const fetchStreamList = async () => {
      try {
        const requestUrl = 'https://hubeau.eaufrance.fr/api/v1/temperature/station?size=' + elemsToShow.toString();
        await fetch(requestUrl).then((response) => {
          response.json().then((json) => {
            //console.log(json)
            setStreamList(json.data)
          })
        }).catch(error => {
          console.log(error);
        });
      } catch (e) {
        console.log(e)
      }
    }

    //console.log(elemsToShow)
    fetchStreamList();
  }, [elemsToShow])

  const setFurtherLoadingAsync = async (bool) => {
    // your actions here
    setFurtherLoading(bool);
  }

  const search = async (fromDate, toDate) => {
    setFromDate(fromDate);
    setToDate(toDate);
  }

  const onChangeCheckList = (value, libelle_station) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
      
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  if (furtherLoading === false && inView) {
    console.log(furtherLoading);
    setFurtherLoadingAsync(true);
    setElemsToShow(elemsToShow + 50);
  } else if (furtherLoading === true && inView === false) {
    setFurtherLoadingAsync(false);
    console.log(furtherLoading);
  }

  console.log(fromDate)
  console.log(toDate)
  return (
    <div>
        <Drawer
          sx={{
            width: 360,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 360,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          {streamList.length === 0
            ? <CircularProgress />
            : <StreamList onChange={onChangeCheckList} checkedStreams={checked} list={streamList} triggerRef={ref} />
          }
        </Drawer>
        <Box
          component="main"
          sx={{
            paddingLeft: 45,
            paddingTop: 1
          }}
        >
          <DateSelecter search={search} from={fromDate} to={toDate}/>
          <GraphList checkedStreams={checked} from={fromDate} to={toDate}/>
        </Box>
    </div>
  );
}

export default App;
