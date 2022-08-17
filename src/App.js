import React, {useState, useEffect } from 'react';
import './App.css';
import CheckboxListSecondary from './StreamList'
import GraphList from './GraphList'
import DateSelecter from './DateSelecter'
import { useInView } from 'react-intersection-observer';
import CircularProgress from '@mui/material/CircularProgress';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

import Drawer from '@mui/material/Drawer';
function App() {
  const [streamList, setStreamList] = useState([]);
  const [elemsToShow, setElemsToShow] = useState(20);
  const [furtherLoading, setFurtherLoading] = useState(false);
  const [ref, inView] = useInView();

  useEffect(() => {
    const fetchStreamList = async () => {
      try {
        const requestUrl = 'https://hubeau.eaufrance.fr/api/v1/temperature/station?size=' + elemsToShow.toString();
        await fetch(requestUrl,).then((response) => {
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

  if (furtherLoading === false && inView) {
    console.log(furtherLoading);
    setFurtherLoadingAsync(true);
    setElemsToShow(elemsToShow + 20);
  } else if (furtherLoading === true && inView === false) {
    setFurtherLoadingAsync(false);
    console.log(furtherLoading);
  }

  return (
    <div><Drawer
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
        ? <CircularProgress/>
        : <CheckboxListSecondary list={streamList} triggerRef={ref}/>
        }
      </Drawer>
      <Box
        component="main"
        sx={{
        paddingLeft: 45,
        paddingTop: 1
       }}
      >
      <DateSelecter/>
      <GraphList/>
      </Box>
    </div>
  );
}

export default App;
