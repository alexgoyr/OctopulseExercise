import React, {useState, useEffect} from 'react';
import './App.css';
import CheckboxListSecondary from './StreamList'
import CircularProgress from '@mui/material/CircularProgress';

function App() {
  const [streamList, setStreamList] = useState([]);

  useEffect(() => {
    fetchStreamList();
  }, [])

  const fetchStreamList = async () => {
    try {
      const requestUrl = 'https://hubeau.eaufrance.fr/api/v1/temperature/station?size=100';
      await fetch(requestUrl,).then((response) => {
        response.json().then((json) => {
          console.log(json)
          setStreamList(json.data)
        })
      }).catch(error => {
        console.log(error);
      });
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <div>
      {streamList.length === 0 ? <CircularProgress/> : <CheckboxListSecondary list={streamList}/>}
    </div>
  );
}

export default App;
