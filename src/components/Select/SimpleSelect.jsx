import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(3),
    minWidth: 220,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect({ heading, action, values }) {
  const classes = useStyles();
  const [value, setValue] = useState();

  const handleChange = (event) => {
    setValue(event.target.value);
    action(event.target.value);
  };

  return (
    <div>
      <FormControl variant='outlined' className={classes.formControl}>
        <InputLabel id='demo-simple-select-outlined-label'>
          {heading}
        </InputLabel>
        <Select value={value} onChange={handleChange} label={heading}>
          {values.map(({ value, label, id }) => (
            <MenuItem key={id} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
