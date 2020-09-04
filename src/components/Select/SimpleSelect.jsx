import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { isMobile } from 'react-device-detect';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(3),
    // minWidth: isMobile ? 280 : 220,
    minWidth: isMobile ? 280 : window.innerWidth / 4.3,

    // window.innerHeight
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect({ heading, action, values, newValue }) {
  const classes = useStyles();
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    if (!newValue) setValue(event.target.value);
    action(event.target.value);
  };

  return (
    <div>
      <FormControl variant='outlined' className={classes.formControl}>
        <InputLabel>{heading}</InputLabel>
        <Select
          value={newValue ? newValue : value}
          onChange={handleChange}
          label={heading}
          // setValue={newValue}
        >
          {values.map(({ value, label }, i) => (
            <MenuItem key={i} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
