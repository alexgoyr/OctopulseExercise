import React from 'react';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
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
            <DesktopDatePicker
              label="From"
              inputFormat="yyyy/MM/dd"
              value={fromDate}
              onChange={handleChangeFrom}
              renderInput={(params) => <TextField {...params} />}
            />
            <DesktopDatePicker
              label="To"
              inputFormat="yyyy/MM/dd"
              value={toDate}
              onChange={handleChangeTo}
              renderInput={(params) => <TextField {...params} />}
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

