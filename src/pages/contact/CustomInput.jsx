import React from 'react'
import {Field} from 'formik';
import {TextField} from 'formik-material-ui';
import { makeStyles} from '@material-ui/core/styles';
const inputSize = window.innerWidth >= 500 ? 'small' : 'normal'

const useStyles = makeStyles({
  textField: {
    width: 200,
    color: 'green'
  },

  cssLabel: {
    color: 'rgba(222, 217, 247, 0.6)',
    "&.Mui-error": {
      color: 'rgb(248, 215, 221)'
    },
    "&.MuiFormHelperText-root": {
      color: 'white'
    },
    "&.Mui-focused": {
      color: 'rgb(248, 215, 221)'
    }
  },

  cssOutlinedInput: {
    '&.MuiInputBase-root': {
      color : 'rgb(175, 108, 121)',
    },
    '&$cssFocused $notchedOutline': {
      borderColor: `rgb(248, 215, 221) !important`,
    },
    // "&.MuiFormLabel-filled": {
    //   color: 'rgb(143, 27, 48)'
    // },
  },

  cssFocused: {
    color: 'white'
  },

  notchedOutline: {
    borderWidth: '1px',
    borderColor: 'rgb(248, 215, 221) !important'
  },
});

// Input component must have a label and name:
const CustomInput = (props) => {

  const classes = useStyles();
  return (
    
    <Field
      component={TextField}

      {...props}
      variant="outlined"
      fullWidth
      size={inputSize}
      InputLabelProps={{
        classes: {
          root: classes.cssLabel,
          focused: classes.cssFocused,
        },
      }}
      InputProps={{
        classes: {
          root: classes.cssOutlinedInput,
          focused: classes.cssFocused,
          notchedOutline: classes.notchedOutline,
        },
        style: {

        }
      }}
    />
  )
}

export default CustomInput
