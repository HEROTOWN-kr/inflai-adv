import React, { useContext, useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import {
  Box, Button, Divider, TextField
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AuthContext from '../../context/AuthContext';
import { Colors } from '../../lib/Сonstants';
import StyledText from '../../containers/StyledText';
import ReactFormText from '../../containers/ReactFormText';
import StyledButton from '../../containers/StyledButton';
import NavLogin from './sns/NavLogin';
import KakLogin from './sns/KakLogin';
import FindId from './FindId';
import ResetPass from './ResetPass';

const defaultValues = {
  email: '',
  password: '',
};

const schema = Yup.object().shape({
  email: Yup.string().email('잘못된 이메일 형식 입니다.').required('이메일을 입력해주세요'),
  password: Yup.string().required('비밀번호를 입력해주세요'),
});

function LoginNew() {
  const history = useHistory();
  const [mainError, setMainError] = useState({});
  const auth = useContext(AuthContext);

  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues
  });

  function logIn(values) {
    axios.post('/api/auth/loginAdv', { ...values }).then((res) => {
      if (res.status === 200) {
        const {
          social_type, userToken, userName, userPhoto
        } = res.data;
        auth.login(userToken, userName, social_type, userPhoto);
        history.push('/');
      } else if (res.status === 201) {
        setMainError({ message: res.data.message });
      }
    }).catch(error => alert(error.response.data.message));
  }

  const handleUserKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(logIn)();
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
      <StyledText mb="44px" textAlign="center" fontSize="36px">로그인</StyledText>
      <Box mb={3}>
        <ReactFormText
          register={register}
          errors={errors}
          name="email"
          placeholder="이메일"
        />
      </Box>
      <ReactFormText
        register={register}
        errors={errors}
        name="password"
        type="password"
        placeholder="비밀번호"
        onKeyPress={handleUserKeyPress}
      />
      {mainError.message ? (
        <Box my={3}>
          <div className="error-message">{mainError.message ? mainError.message : null}</div>
        </Box>
      ) : null}
      <Box mt={3} mb={2}>
        <StyledButton
          height={36}
          background="#f50057"
          hoverBackground="#c51162"
          onClick={handleSubmit(logIn)}
        >
        로그인
        </StyledButton>
      </Box>
      <Box mb={2}>
        <Grid container justify="space-between">
          <Grid item>
            <FindId />
          </Grid>
          <Grid item>
            <ResetPass />
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <Box my={3}>
        <NavLogin />
        <KakLogin />
      </Box>
      <Divider />
      <Box mt={3}>
        <StyledButton height={44} onClick={() => history.push('/SignUpNew')}>회원가입하기</StyledButton>
      </Box>
    </Box>
  );
}

export default LoginNew;
