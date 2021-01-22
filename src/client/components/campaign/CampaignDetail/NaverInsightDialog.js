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

function NaverInsightDialog(props) {
  const { open, closeDialog, selectedId } = props;
  const [naverData, setNaverData] = useState({});
  const classes = useStyles();

  async function getNaverInfo() {
    try {
      const InstaData = await axios.get('/api/TB_NAVER/getInfo', {
        params: { id: selectedId }
      });
      const { data } = InstaData.data;
      setNaverData(data);
    } catch (err) {
      alert(err.response.data.message);
    }
  }

  function onDialogEntered() {
    setNaverData({});
    getNaverInfo();
  }

  return (
    <Dialog
      classes={{ paper: classes.paper }}
      maxWidth="sm"
      onClose={closeDialog}
      aria-labelledby="simple-dialog-title"
      open={open}
      onEntered={onDialogEntered}
    >
      <Box padding="20px" fontSize="18px" fontWeight="400" lineHeight="18px" textAlign="center" position="relative" borderBottom={`1px solid ${Colors.grey8}`}>
        SNS 정보
        <Clear onClick={closeDialog} classes={{ root: classes.root }} />
      </Box>
      <Box padding="20px">
        <Box>
          <Grid container justify="space-between">
            <Grid item>이름</Grid>
            <Grid item>{naverData.PAR_NAME}</Grid>
          </Grid>
        </Box>
        {/* <Box py={1}>
          <Grid container justify="space-between">
            <Grid item>이메일</Grid>
            <Grid item>{naverData.PAR_EMAIL}</Grid>
          </Grid>
        </Box>
        <Box py={1}>
          <Grid container justify="space-between">
            <Grid item>전화번호</Grid>
            <Grid item>{naverData.PAR_TEL}</Grid>
          </Grid>
        </Box>
        <Box py={1}>
          <Grid container justify="space-between" spacing={2}>
            <Grid item>주소</Grid>
            <Grid item xs>
              <Box textAlign="right">
                {`(${naverData.PAR_POST_CODE}) ${naverData.PAR_ROAD_ADDR} ${naverData.PAR_DETAIL_ADDR} (${naverData.PAR_EXTR_ADDR})`}
              </Box>
            </Grid>
          </Grid>
        </Box> */}
        <Box>
          <Grid container justify="space-between">
            <Grid item>블로그주소</Grid>
            <Grid item>
              <a target="_blank" href={naverData.NAV_URL}>
                {naverData.NAV_URL}
              </a>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Dialog>
  );
}

export default NaverInsightDialog;
