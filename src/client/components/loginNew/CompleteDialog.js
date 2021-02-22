import React from 'react';
import {
  Box, Dialog, IconButton, makeStyles
} from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { Colors } from '../../lib/Сonstants';
import StyledButton from '../../containers/StyledButton';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: '0',
    right: '0',
    color: '#b9b9b9de'
  },
  paper: {
    margin: '12px',
    // width: '100%',
    borderRadius: '2px'
  },
  button: {
    padding: 0,
    minWidth: 0
  },
});

function CompleteDialog(props) {
  const {
    open, handleClose
  } = props;
  const classes = useStyles();
  const history = useHistory();

  function onDialogClose() {
    localStorage.removeItem('loginInfo');
    handleClose();
    history.push('/');
  }

  return (
    <Dialog
      classes={{ paper: classes.paper }}
      onClose={onDialogClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <Box p="15px" fontSize="21px" fontWeight="400" lineHeight="18px" textAlign="center" position="relative" borderBottom={`1px solid ${Colors.grey8}`}>
              인플라이
        <IconButton size="medium" classes={{ root: classes.root }} onClick={onDialogClose}>
          <Clear />
        </IconButton>
      </Box>
      <Box px={2} py={2} maxWidth="465px" textAlign="center" fontSize="16px" boxSizing="border-box">
        회원가입 완료되었습니다.
        <br />
이메일에 인증링크가 발송되었습니다. 확인해주세요.
        <Box mx="auto" mt={2} boxSizing="border-box" width="100px">
          <StyledButton height={38} onClick={onDialogClose}>확인</StyledButton>
        </Box>
      </Box>
    </Dialog>
  );
}

export default CompleteDialog;
