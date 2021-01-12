import React from 'react';
import { TextField, InputAdornment, withStyles } from '@material-ui/core';
import '../css/sub.scss';

const StyledTextField = withStyles({
  root: {
    '& .MuiOutlinedInput-input': {
      padding: '10.5px 14px',
    },
    '& .MuiOutlinedInput-multiline': {
      padding: '0',
    },
    /* '& .MuiOutlinedInput-input': {
      padding: '10.5px 14px',
    } */
  },
})(TextField);

export default StyledTextField;
