import React, { useState } from 'react';
import {
  Box, Dialog, IconButton, makeStyles
} from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
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
  name: '',
  phone: ''
};

Yup.addMethod(Yup.string, 'integerString', function () {
  return this.matches(/^\d+$/, '숫자 입력만 가능합니다');
});

const schema = Yup.object().shape({
  name: Yup.string()
    .required('이름을 입력해주세요'),
  phone: Yup.string().required('연락처를 입력해주세요').integerString(),
});

function FindIdDialog(props) {
  const { open, closeDialog } = props;
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState(null);
  const [userId, setUserId] = useState(null);

  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues
  });

  function findId(values) {
    setUserId(null);
    setErrorMessage(null);
    axios.get('/api/TB_ADVERTISER/findId', {
      params: values
    }).then((res) => {
      if (res.status === 200) {
        setUserId(res.data.data);
      } else if (res.status === 201) {
        setErrorMessage(res.data.message);
      }
    }).catch((err) => {
      alert(err.response.data.message);
    });
  }

  function onDilogClose() {
    setUserId(null);
    setErrorMessage(null);
    closeDialog();
  }

  const handleUserKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(findId)();
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
          아이디 찾기
        <IconButton size="medium" classes={{ root: classes.dialogRoot }} onClick={onDilogClose}>
          <Clear />
        </IconButton>
      </Box>
      <Box px={2} py={2} width="325px" boxSizing="border-box">
        <ReactFormText
          register={register}
          errors={errors}
          name="name"
          placeholder="이름"
        />
        <Box my={1}>
          <ReactFormText
            register={register}
            errors={errors}
            name="phone"
            placeholder="전화번호"
            onKeyPress={handleUserKeyPress}
          />
        </Box>
        {errorMessage ? (
          <Box my={1} textAlign="center">
            <div className="error-message">{errorMessage}</div>
          </Box>
        ) : null}
        {userId ? (
          <Box my={1} fontSize="16px" textAlign="center">
            사용자 아이디는
            <br />
            <span style={{ color: Colors.red }}>{userId}</span>
          </Box>
        ) : null}
        <Box mt={1}>
          <StyledButton height={40} onClick={handleSubmit(findId)}>
            아이디 찾기
          </StyledButton>
        </Box>
      </Box>
    </Dialog>
  );
}

function FindId() {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);

  function toggleDialog() {
    setOpenDialog(!openDialog);
  }

  return (
    <React.Fragment>
      <Box classes={{ root: classes.root }} component="u" onClick={toggleDialog}>아이디 찾기</Box>
      <FindIdDialog open={openDialog} closeDialog={toggleDialog} />
    </React.Fragment>
  );
}

export default FindId;
