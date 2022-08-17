import React, { useRef } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';

export default function CheckboxListSecondary({list, triggerRef}) {
  const [checked, setChecked] = React.useState([]);
  let currentRef = useRef()
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  //console.log(list)
  const listLength = list.length;
  return (
    
    <List sx={{
      width: '100%',
      maxWidth: 360,
      bgcolor: 'background.paper',
      overflow: 'auto',
      maxHeight: 900,
      '& ul': { padding: 0 },
    }}>
      {list.map((value, index) => {
        const labelId = `checkbox-list-secondary-label-${value.libelle_station}`;
        if (index + 1 === listLength)
          currentRef = triggerRef
        return (
          <ListItem
            key={index}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={handleToggle(value.libelle_station)}
                checked={checked.indexOf(value.libelle_station) !== -1}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            }
            disablePadding
          >
            {}
            <ListItemButton>
              <ListItemText id={labelId} primary={value.libelle_station} secondary={value.libelle_departement}/>
            </ListItemButton>
          </ListItem>
        );
      })}
      <div ref={currentRef}/>
      <CircularProgress/>
    </List>
  );
}
