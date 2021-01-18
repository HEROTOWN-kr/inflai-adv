import React, { useState } from 'react';
import {
  Box, Dialog, Grid, makeStyles
} from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import axios from 'axios';
import { Colors } from '../../../lib/Сonstants';

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

function DetailDataDialog(props) {
  const { open, closeDialog, selectedId } = props;
  const [participantData, setParticipantData] = useState({});
  const classes = useStyles();

  async function getInfo() {
    try {
      const response = await axios.get('/api/TB_PARTICIPANT/getInfo', {
        params: { id: selectedId }
      });
      const { data } = response.data;
      setParticipantData(data);
    } catch (err) {
      alert(err.response.data.message);
    }
  }

  function onDialogClose() {
    setParticipantData({});
    closeDialog();
  }

  function onDialogEntered() {
    getInfo();
  }

  return (
    <Dialog
      classes={{ paper: classes.paper }}
      maxWidth="sm"
      onClose={onDialogClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      onEntered={onDialogEntered}
    >
      <Box padding="20px" fontSize="18px" fontWeight="400" lineHeight="18px" textAlign="center" position="relative" borderBottom={`1px solid ${Colors.grey8}`}>
                정보
        <Clear onClick={onDialogClose} classes={{ root: classes.root }} />
      </Box>
      <Box padding="20px">
        <Box>
          <Grid container justify="space-between">
            <Grid item>이름</Grid>
            <Grid item>{participantData.PAR_NAME}</Grid>
          </Grid>
        </Box>
        <Box py={1}>
          <Grid container justify="space-between">
            <Grid item>이메일</Grid>
            <Grid item>{participantData.PAR_EMAIL}</Grid>
          </Grid>
        </Box>
        <Box py={1}>
          <Grid container justify="space-between">
            <Grid item>전화번호</Grid>
            <Grid item>{participantData.PAR_TEL}</Grid>
          </Grid>
        </Box>
        {participantData.PAR_POST_CODE ? (
          <Box py={1}>
            <Grid container justify="space-between" spacing={2}>
              <Grid item>주소</Grid>
              <Grid item xs>
                <Box textAlign="right">
                  {`(${participantData.PAR_POST_CODE}) ${participantData.PAR_ROAD_ADDR} ${participantData.PAR_DETAIL_ADDR} (${participantData.PAR_EXTR_ADDR})`}
                </Box>
              </Grid>
            </Grid>
          </Box>
        ) : null}
      </Box>
    </Dialog>
  );
}

export default DetailDataDialog;
