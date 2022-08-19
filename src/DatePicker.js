import React from 'react';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';

export default function DatePicker({label, onChange, value}) {
    return (
      <React.Fragment>
            <DesktopDatePicker
                label={label}
                inputFormat="yyyy/MM/dd"
                value={value}
                onChange={onChange}
                renderInput={(params) => <TextField {...params} />}
            />
      </React.Fragment>
    );
  }
  
  