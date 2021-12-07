import React from 'react';
import {
  Box, Dialog, IconButton, makeStyles
} from '@material-ui/core';
import { Cancel, Clear } from '@material-ui/icons';
import YoutubeAnalysis from './YoutubeAnalysis';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: '15px',
    right: '14px',
    fontSize: '28px',
    color: '#b9b9b9de'
  },
  paper: {
    margin: '12px',
    width: '100%',
    borderRadius: '2px',
  },
  paperScrollBody: {
    maxWidth: '1500px',
  }
}));

function AnalysisDialog(props) {
  const { open, closeDialog, id } = props;

  const classes = useStyles();
  return (
    <Dialog
      disableBackdropClick
      scroll="body"
      classes={{
        paper: classes.paper,
        paperScrollBody: classes.paperScrollBody,
      }}
      onClose={closeDialog}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <YoutubeAnalysis id={id} closeDialog={closeDialog} />
    </Dialog>
  );
}

export default AnalysisDialog;
