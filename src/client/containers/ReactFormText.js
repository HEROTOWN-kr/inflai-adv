import React from 'react';
import { useForm } from 'react-hook-form';
import { Checkbox, makeStyles } from '@material-ui/core';
import StyledTextField from './StyledTextField';

const useStyles = makeStyles({
  FormHelperContained: {
    marginLeft: '0'
  },
});

function ReactFormText(props) {
  const {
    errors,
    register,
    name,
    ...rest
  } = props;

  const classes = useStyles();

  return (
    <StyledTextField
      variant="outlined"
      fullWidth
      name={name}
      inputRef={register}
      error={!!errors[name]}
      FormHelperTextProps={{
        classes: { contained: classes.FormHelperContained }
      }}
      helperText={<span className="error-message">{errors[name]?.message}</span>}
      css={{ transition: 'all 1s ease-out' }}
      {...rest}
    />
  );
}


export default ReactFormText;
