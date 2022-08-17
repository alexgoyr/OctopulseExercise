import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Stack from '@mui/material/Stack';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Box from '@mui/material/Box';


export default function DateSelecter() {
    const [value, setValue] = React.useState(new Date('2014/08/18'));

    const handleChange = (newValue) => {
      setValue(newValue);
    };
  
      
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
          <Box sx={{alignSelf: 'center'}}>
            <DesktopDatePicker
            sx={{paddingRight: 10}}
              label="From"
              inputFormat="yyyy/MM/dd"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          <DesktopDatePicker
            sx={{paddingLeft: 10}}
            label="To"
            inputFormat="yyyy/MM/dd"
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
          </Box>
        </Stack>
      </LocalizationProvider>
    </div>
  );
}

