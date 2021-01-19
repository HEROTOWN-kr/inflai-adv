import React from 'react';
import {
  Box,
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, useMediaQuery
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import StyledText from '../../containers/StyledText';
import StyledButton from '../../containers/StyledButton';

const PaymentData = [
  {
    title: '선택한 플랜',
    data: 'planName'
  },
  {
    title: '이용금액',
    // data: 'pricePerMonth'
    data: 'price'
  },
  {
    title: '은행',
    data: 'bankName'
  },
  {
    title: '계좌번호',
    data: 'bankAccount'
  },
  {
    title: '계좌명',
    data: 'bankHost'
  }
];

export default function PlanSuccessDialog(props) {
  const {
    open, handleClose, onConfirm, selectedData
  } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const onConfirmFunc = () => {
    onConfirm();
    handleClose();
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <Box p={4}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <StyledText textAlign="center" fontSize="28">계좌 송금 안내</StyledText>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              {
                PaymentData.map(item => (
                  <Grid item key={item.title} xs={12}>
                    <Grid container justify="space-between">
                      <Grid item><StyledText fontSize="18" lineHeight="1.5em">{item.title}</StyledText></Grid>
                      <Grid item><StyledText fontSize="18" lineHeight="1.5em">{selectedData[item.data]}</StyledText></Grid>
                    </Grid>
                  </Grid>
                ))
              }
            </Grid>
            <Box mt={4}>
              <StyledText fontSize="15" lineHeight="1.5em">
                *신청 후 24시간 이내에 승인이 됩니다. 승인 후 캠페인(인플루언서모집)을 진행하실 수 있습니다.
              </StyledText>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              <Grid item>
                <StyledButton
                  background="#ff005b"
                  hoverBackground="#e00452"
                  height="36px"
                  fontSize="16px"
                  padding="0 20px"
                  onClick={handleClose}
                >
                취소
                </StyledButton>
              </Grid>
              <Grid item>
                <StyledButton
                  height="36px"
                  fontSize="16px"
                  padding="0 20px"
                  onClick={onConfirm}
                >
                  신청
                </StyledButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}
