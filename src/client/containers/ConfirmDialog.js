import React from 'react';
import {
  Box,
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, makeStyles, useMediaQuery
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Clear, WarningRounded } from '@material-ui/icons';
import StyledButton from './StyledButton';
import { Colors } from '../lib/Сonstants';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: '15px',
    right: '14px',
    fontSize: '28px',
    color: '#b9b9b9de',
    cursor: 'pointer'
  },
  paper: {
    margin: '12px',
    width: '100%',
    borderRadius: '2px'
  }
});

export default function ConfirmDialog(props) {
  const {
    open, closeDialog, onConfirm, dialogText
  } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

  const onConfirmFunc = () => {
    onConfirm();
    closeDialog();
  };

  return (
    <Dialog
      classes={{ paper: classes.paper }}
      fullScreen={fullScreen}
      open={open}
      onClose={closeDialog}
      maxWidth="xs"
      aria-labelledby="responsive-dialog-title"
    >
      <Box padding="20px" fontSize="18px" fontWeight="400" lineHeight="18px" position="relative" borderBottom={`1px solid ${Colors.grey8}`}>
        INFLAI
        <Clear onClick={closeDialog} classes={{ root: classes.root }} />
      </Box>
      <Box padding="20px">
        <Box mb={4}>{dialogText}</Box>
        <Box>
          <Grid container spacing={2} justify="flex-end">
            <Grid item>
              <Box width="100px">
                <StyledButton padding="0" onClick={closeDialog}>
                아니요
                </StyledButton>
              </Box>
            </Grid>
            <Grid item>
              <Box width="100px">
                <StyledButton padding="0" onClick={onConfirmFunc}>
                  네
                </StyledButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Dialog>
  );
}
