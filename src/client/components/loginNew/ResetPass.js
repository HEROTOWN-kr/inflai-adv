import React, { useState } from 'react';
import {
  Box, Dialog, IconButton, makeStyles
} from '@material-ui/core';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { Clear } from '@material-ui/icons';
import { Colors } from '../../lib/Сonstants';
import ReactFormText from '../../containers/ReactFormText';
import StyledButton from '../../containers/StyledButton';

const useStyles = makeStyles({
  root: {
    fontSize: '13px',
    cursor: 'pointer',
    '&:hover': {
      color: Colors.pink
    }
  },
  dialogRoot: {
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
  socialMediaButton: {

  }
});

const defaultValues = {
  email: '',
};

Yup.addMethod(Yup.string, 'integerString', function () {
  return this.matches(/^\d+$/, '숫자 입력만 가능합니다');
});

const schema = Yup.object().shape({
  email: Yup.string()
    .required('이메일을 입력해주세요')
    .email('잘못된 이메일 형식 입니다.')
});

function ResetPassDialog(props) {
  const { open, closeDialog, openSuccess } = props;
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState(null);

  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues
  });

  function onDilogClose() {
    setErrorMessage(null);
    closeDialog();
  }

  function sendEmail(values) {
    setErrorMessage(null);
    axios.get('/api/TB_ADVERTISER/resetPassLink', {
      params: values
    }).then((res) => {
      if (res.status === 200) {
        setErrorMessage(null);
        closeDialog();
        setTimeout(() => {
          openSuccess();
        }, 300);
      } else if (res.status === 201) {
        setErrorMessage(res.data.message);
      }
    }).catch((err) => {
      alert(err.response.data.message);
    });
  }

  const handleUserKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(sendEmail)();
    }
  };

  return (
    <Dialog
      classes={{ paper: classes.paper }}
      onClose={onDilogClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <Box p="15px" fontSize="16px" fontWeight="400" lineHeight="18px" textAlign="center" position="relative" borderBottom={`1px solid ${Colors.grey8}`}>
        비밀번호 찾기
        <IconButton size="medium" classes={{ root: classes.dialogRoot }} onClick={onDilogClose}>
          <Clear />
        </IconButton>
      </Box>
      <Box px={2} py={2} width="325px" boxSizing="border-box">
        <Box mb={1}>
          <ReactFormText
            register={register}
            errors={errors}
            name="email"
            placeholder="이메일"
            onKeyPress={handleUserKeyPress}
          />
        </Box>
        {errorMessage ? (
          <Box my={1} textAlign="center">
            <div className="error-message">{errorMessage}</div>
          </Box>
        ) : null}
        <Box mt={1}>
          <StyledButton height={40} onClick={handleSubmit(sendEmail)}>
              이메일 보내기
          </StyledButton>
        </Box>
      </Box>
    </Dialog>
  );
}

function SuccessDialog(props) {
  const { open, closeDialog } = props;
  const classes = useStyles();

  return (
    <Dialog
      classes={{ paper: classes.paper }}
      onClose={closeDialog}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <Box p="15px" fontSize="16px" fontWeight="400" lineHeight="18px" textAlign="center" position="relative" borderBottom={`1px solid ${Colors.grey8}`}>
          비밀번호 찾기
        <IconButton size="medium" classes={{ root: classes.dialogRoot }} onClick={closeDialog}>
          <Clear />
        </IconButton>
      </Box>
      <Box px={2} py={2} width="325px" boxSizing="border-box">
        <Box mb={1}>
          이메일에 비밀번호 변경링크가 발송되었습니다. 확인해주세요.
        </Box>
        <Box mt={1}>
          <StyledButton height={40} onClick={closeDialog}>
              확인
          </StyledButton>
        </Box>
      </Box>
    </Dialog>
  );
}

function ResetPass() {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);

  function toggleDialog() {
    setOpenDialog(!openDialog);
  }

  function toggleSuccessDialog() {
    setSuccessDialog(!successDialog);
  }

  return (
    <React.Fragment>
      <Box classes={{ root: classes.root }} component="u" onClick={toggleDialog}>비밀번호 찾기</Box>
      <ResetPassDialog open={openDialog} closeDialog={toggleDialog} openSuccess={toggleSuccessDialog} />
      <SuccessDialog open={successDialog} closeDialog={toggleSuccessDialog} />
    </React.Fragment>
  );
}

export default ResetPass;
