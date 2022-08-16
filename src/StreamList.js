import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';

export default function CheckboxListSecondary({list}) {
  const [checked, setChecked] = React.useState([]);

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
  console.log(list)
  return (
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {list.map((value) => {
        const labelId = `checkbox-list-secondary-label-${value.libelle_station}`;
        return (
          <ListItem
            key={value.libelle_station}
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
            <ListItemButton>
              <ListItemText id={labelId} primary={value.libelle_station} secondary={value.libelle_departement}/>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
