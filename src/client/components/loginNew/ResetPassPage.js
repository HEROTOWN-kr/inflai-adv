import React, { useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import {
  Box, Dialog, IconButton, makeStyles
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { Clear } from '@material-ui/icons';
import { Colors } from '../../lib/Сonstants';
import StyledText from '../../containers/StyledText';
import ReactFormText from '../../containers/ReactFormText';
import StyledButton from '../../containers/StyledButton';
import CompleteDialog from './CompleteDialog';
import StyledBackDrop from '../../containers/StyledBackDrop';

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
  socialMediaButton: {

  }
});

const defaultValues = {
  password: '',
  passwordConfirm: '',
};

const schema = Yup.object().shape({
  password: Yup.string()
    .required('비밀번호를 입력해주세요'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], '비밀번호가 일치해야합니다')
    .required('비밀번호 확인해주세요'),
});

function SuccessDialog(props) {
  const { open, closeDialog } = props;
  const history = useHistory();
  const classes = useStyles();

  function onDialogClose() {
    closeDialog();
    history.push('/Login');
  }

  return (
    <Dialog
      classes={{ paper: classes.paper }}
      onClose={onDialogClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <Box p="15px" fontSize="16px" fontWeight="400" lineHeight="18px" textAlign="center" position="relative" borderBottom={`1px solid ${Colors.grey8}`}>
          비밀번호 변경
        <IconButton size="medium" classes={{ root: classes.root }} onClick={onDialogClose}>
          <Clear />
        </IconButton>
      </Box>
      <Box px={2} py={2} width="325px" boxSizing="border-box">
        <Box mb={1}>
            비밀번호 변경이 완료되었습니다. 로그인해주세요.
        </Box>
        <Box mt={1}>
          <StyledButton height={40} onClick={onDialogClose}>
              확인
          </StyledButton>
        </Box>
      </Box>
    </Dialog>
  );
}

function ResetPassPage() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [savingMode, setSavingMode] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const params = useParams();
  const { hash } = params;

  function toggleDialog() {
    setDialogOpen(!dialogOpen);
  }

  function toggleSavingMode() {
    setSavingMode(!savingMode);
  }

  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues
  });

  function changePassword(values) {
    setSavingMode(true);
    axios.post('/api/TB_ADVERTISER/resetPass', { ...values, hash }).then((res) => {
      setSavingMode(false);
      toggleDialog();
    }).catch((err) => {
      setErrorMessage(err.response.data.message);
      setSavingMode(false);
    });
  }

  return (
    <Box
      maxWidth="400px"
      m="48px auto"
      boxSizing="border-box"
      border={{ xs: 'medium none color', md: `solid 1px ${Colors.grey}` }}
      py={{ xs: 0, md: 6 }}
      px={{ xs: 2, md: 6 }}
    >
      <StyledText mb="30px" textAlign="center" fontSize="26px">비밀번호 변경</StyledText>
      <ReactFormText
        register={register}
        errors={errors}
        name="password"
        type="password"
        placeholder="비밀번호"
      />
      <Box my={2}>
        <ReactFormText
          register={register}
          errors={errors}
          name="passwordConfirm"
          type="password"
          placeholder="비밀번호 확인"
        />
      </Box>
      {errorMessage ? (
        <Box mb={1} textAlign="center">
          <div className="error-message">{errorMessage || null}</div>
        </Box>
      ) : null}
      <Box my={3}>
        <StyledButton
          height={36}
          background="#f50057"
          hoverBackground="#c51162"
          onClick={handleSubmit(changePassword)}
        >
          비밀번호 변경
        </StyledButton>
      </Box>
      <StyledBackDrop open={savingMode} handleClose={toggleSavingMode} />
      <SuccessDialog open={dialogOpen} closeDialog={toggleDialog} />
    </Box>
  );
}

export default ResetPassPage;
