import React, { useState } from 'react';
import {
  Box, Dialog, IconButton, makeStyles
} from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import { Colors } from '../../../lib/Сonstants';
import AnalysisComponent from '../../Analysis/AnalysisComponent';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: '0',
    right: '0',
    color: '#b9b9b9de'
  },
  paper: {
    margin: '12px',
    width: '100%',
    borderRadius: '2px'
  },
  paperScrollBody: {
    maxWidth: '1500px',
  },
  button: {
    padding: 0,
    minWidth: 0
  },
});

const InstaInsightDialog = (props) => {
  const { INS_ID, open, handleClose } = props;
  const classes = useStyles();

  return (
    <Dialog
      /* classes={{ paper: classes.paper }}
      fullScreen */
      disableBackdropClick
      scroll="body"
      classes={{
        paper: classes.paper,
        paperScrollBody: classes.paperScrollBody,
      }}
      aria-labelledby="simple-dialog-title"
      open={open}
      onClose={handleClose}
    >
      <Box p="15px" fontSize="21px" fontWeight="400" lineHeight="18px" textAlign="center" position="relative" borderBottom={`1px solid ${Colors.grey8}`}>
              인플라이
        <IconButton size="medium" classes={{ root: classes.root }} onClick={handleClose}>
          <Clear />
        </IconButton>
      </Box>
      <Box>
        <AnalysisComponent INS_ID={INS_ID} closeDialog={handleClose} />
      </Box>
    </Dialog>
  );
};

export default InstaInsightDialog;
