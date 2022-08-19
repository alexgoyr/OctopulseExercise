import React from 'react';
import DatePicker from './DatePicker';
import Stack from '@mui/material/Stack';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


export default function DateSelecter({search}) {
  const [fromDate, setFromDate] = React.useState(new Date());
  const [toDate, setToDate] = React.useState(new Date());
  
  const handleChangeFrom = (newValue) => {
    setFromDate(newValue);
  };

  const handleChangeTo = (newValue) => {
    setToDate(newValue);
  };

  const onClickButton = () => {
    search(fromDate, toDate);
  }

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack >
          <Box sx={{ alignSelf: 'center' }}>
            <DatePicker
              label="From"
              value={fromDate}
              onChange={handleChangeFrom}
            />
            <DatePicker
              label="To"
              value={toDate}
              onChange={handleChangeTo}
            />
          </Box>
          <Box sx={{ alignSelf: 'center' }}>
            <Button variant="contained" onClick={onClickButton}>Search</Button>
          </Box>
        </Stack>
      </LocalizationProvider>
    </div>
  );
}

