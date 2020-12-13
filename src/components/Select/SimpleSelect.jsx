import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './SimpleSelect.module.css'

const useStyles = makeStyles((theme) => {
  const largeStyle = {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    minWidth: window.innerWidth / 6,
    maxWidth: 10,
  }
  
  const smallStyle = {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    minWidth: window.innerWidth / 6,

  }
  
  return {
  formControl: window.innerWidth >= 900 ? largeStyle : smallStyle,
  selectEmpty: {
    marginTop: theme.spacing(1),
  },

  // select: {
  //   width: '3em'
  // }

}});

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
