import React from 'react';
import {
  Box, Dialog, IconButton, makeStyles, useMediaQuery
} from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import { Colors } from '../../../lib/Сonstants';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: '0',
    right: '0',
    color: '#b9b9b9de'
  },
  paper: {
    margin: '12px',
    maxWidth: '300px',
    width: '100%',
    borderRadius: '2px'
  },
  button: {
    padding: 0,
    minWidth: 0
  },
});

function CampaignCopyDialog(props) {
  const {
    open, closeDialog, campaignId, getCampaigns
  } = props;

  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      classes={{ paper: classes.paper }}
      fullScreen={fullScreen}
      open={open}
      onClose={close}
      aria-labelledby="responsive-dialog-title"
    >
      <Box p="15px" fontSize="16px" fontWeight="400" lineHeight="18px" textAlign="center" position="relative" borderBottom={`1px solid ${Colors.grey8}`}>
          캠페인 복사
        <IconButton size="medium" classes={{ root: classes.root }} onClick={close}>
          <Clear />
        </IconButton>
      </Box>
    </Dialog>
  );
}

export default CampaignCopyDialog;
