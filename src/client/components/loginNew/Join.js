import React, { useContext, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { Box } from '@material-ui/core';
import { Colors } from '../../lib/Сonstants';
import StyledText from '../../containers/StyledText';
import ReactFormText from '../../containers/ReactFormText';
import StyledButton from '../../containers/StyledButton';
import StyledBackDrop from '../../containers/StyledBackDrop';
import CompleteDialog from './CompleteDialog';

const defaultValues = {
  email: '',
  name: '',
  phone: ''
};

Yup.addMethod(Yup.string, 'integerString', function () {
  return this.matches(/^\d+$/, '숫자 입력만 가능합니다');
});

const schema = Yup.object().shape({
  email: Yup.string()
    .email('잘못된 이메일 형식 입니다.')
    .required('이메일을 입력해주세요'),
  name: Yup.string()
    .required('이름을 입력해주세요'),
  phone: Yup.string().required('연락처를 입력해주세요').integerString(),
});

function Join() {
  const history = useHistory();
  const [mainError, setMainError] = useState({});
  const [savingMode, setSavingMode] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const loginInfo = JSON.parse(localStorage.getItem('loginInfo')) || {
    type: null
  };

  function toggleDialog() {
    setDialogOpen(!dialogOpen);
  }

  function toggleSavingMode() {
    setSavingMode(!savingMode);
  }

  useEffect(() => {
    if (!loginInfo.type) history.push('/Login');
    return () => {
      localStorage.removeItem('loginInfo');
    };
  }, []);

  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues
  });

  function naverSignUp(values) {
    setSavingMode(true);
    const post = { ...loginInfo, ...values };
    axios.post('/api/TB_ADVERTISER/naverSignUp', post).then((res) => {
      if (res.status === 200) {
        setSavingMode(false);
        toggleDialog();
      } else if (res.status === 201) {
        setMainError({ message: res.data.message });
        setSavingMode(false);
      }
    }).catch((err) => {
      alert(err.response.data.message);
      setSavingMode(false);
    });
  }

  function kakaoSignUp(values) {
    setSavingMode(true);
    const post = { ...loginInfo, ...values };
    axios.post('/api/TB_ADVERTISER/kakaoSignUp', post).then((res) => {
      if (res.status === 200) {
        setSavingMode(false);
        toggleDialog();
      } else if (res.status === 201) {
        setMainError({ message: res.data.message });
        setSavingMode(false);
      }
    }).catch((err) => {
      alert(err.response.data.message);
      setSavingMode(false);
    });
  }

  function signUp(values) {
    if (loginInfo.type === 'naver') {
      naverSignUp(values);
    } else if (loginInfo.type === 'kakao') {
      kakaoSignUp(values);
    }
  }

  const handleUserKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(signUp)();
    }
  };

  return (
    <Box
      maxWidth="400px"
      m="48px auto"
      boxSizing="border-box"
      border={{ xs: 'medium none color', md: `solid 1px ${Colors.grey}` }}
      py={{ xs: 0, md: 6 }}
      px={{ xs: 2, md: 6 }}
    >
      <StyledText mb="44px" textAlign="center" fontSize="36px">회원가입</StyledText>
      <ReactFormText
        register={register}
        errors={errors}
        name="email"
        placeholder="이메일"
      />
      <Box my={1}>
        <ReactFormText
          register={register}
          errors={errors}
          name="name"
          placeholder="이름"
          onKeyPress={handleUserKeyPress}
        />
      </Box>
      <Box mb={1}>
        <ReactFormText
          register={register}
          errors={errors}
          name="phone"
          placeholder="전화번호"
        />
      </Box>
      {mainError.message ? (
        <Box my={1} textAlign="center">
          <div className="error-message">{mainError.message ? mainError.message : null}</div>
        </Box>
      ) : null}
      <Box mt={3}>
        <StyledButton height={40} onClick={handleSubmit(signUp)}>
          {loginInfo.type === 'naver' ? '네이버' : null}
          {loginInfo.type === 'kakao' ? '카카오' : null}
          {loginInfo.type === 'facebook' ? '페이스북' : null}
          {' 아이디로 회원가입'}
        </StyledButton>
      </Box>
      <StyledBackDrop open={savingMode} handleClose={toggleSavingMode} />
      <CompleteDialog open={dialogOpen} handleClose={toggleDialog} />
    </Box>
  );
}

export default Join;
