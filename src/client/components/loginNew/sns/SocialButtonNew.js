import React, { useContext, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Box, makeStyles } from '@material-ui/core';
import SocialButton from '../../login/SocialButton';
import FacebookIcon from '../../../img/facebook-logo.png';
import AuthContext from '../../../context/AuthContext';
import StyledButton from '../../../containers/StyledButton';
import StyledImage from '../../../containers/StyledImage';

const useStyles = makeStyles({
  root: ({ background, color }) => ({
    background: background || '#3B5998',
    color: color || '#FFFFFF',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '15px',
    '&:hover': {
      opacity: 0.9
    }
  })
});

function SocialButtonNew(props) {
  const {
    background, color, icon, text, ...rest
  } = props;
  const classes = useStyles(props);

  return (
    <Box boxSizing="border-box" py="7px" classes={classes} {...rest}>
      <Grid container justify="center" alignItems="center">
        <Grid item xs="auto">
          <Box p="0 15px" borderRight="1px solid #ffffff">
            <StyledImage cursor="pointer" width="30px" height="30px" src={icon} />
          </Box>
        </Grid>
        <Grid item xs>
          <Box textAlign="center">
            {text}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SocialButtonNew;
