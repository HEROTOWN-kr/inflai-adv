import React, { useContext, useEffect, useState } from 'react';
import { Box, Grid } from '@material-ui/core';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import StyledText from '../../../../../containers/StyledText';
import LabelComponent from '../LabelComponent';
import ReactFormText from '../../../../../containers/ReactFormText';
import AuthContext from '../../../../../context/AuthContext';
import StyledButton from '../../../../../containers/StyledButton';
import { Colors } from '../../../../../lib/Сonstants';

const defaultValues = {
  password: '',
  passwordConfirm: '',
};

const validationShape = {
  password: Yup.string()
    .required('비밀번호를 입력해주세요'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], '비밀번호가 일치해야합니다')
    .required('비밀번호 확인해주세요'),
};

function PasswordChange() {
  const [passwordExist, setPasswordExist] = useState(false);
  const [message, setMessage] = useState({ status: 0, text: null });
  const { token } = useContext(AuthContext);

  if (passwordExist) {
    defaultValues.currentPassword = '';
    validationShape.currentPassword = Yup.string().required('기존 비밀번호를 입력해주세요');
  }

  const schema = Yup.object().shape(validationShape);

  const {
    register, handleSubmit, errors, reset
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues
  });

  function getPassInfo() {
    axios.get('/api/TB_ADVERTISER/getPass', {
      params: { token }
    }).then((res) => {
      if (res.status === 200) {
        if (res.data.data) {
          setPasswordExist(true);
        } else {
          setPasswordExist(false);
        }
      }
    }).catch((err) => {
      alert(err.response.data.message);
    });
  }

  useEffect(() => {
    if (token) getPassInfo();
  }, [token]);

  function updatePass(values) {
    const post = { ...values, token };
    axios.post('/api/TB_ADVERTISER/updatePass', post).then((res) => {
      if (res.status === 200) {
        reset(defaultValues);
        getPassInfo();
        setMessage({ status: res.status, text: res.data.message });
      } else if (res.status === 201) {
        setMessage({ status: res.status, text: res.data.message });
      }
    }).catch((err) => {
      alert(err.response.data.message);
    });
  }


  return (
    <Box py={4}>
      <Box mb={4}>
        <StyledText fontSize="19px" fontWeight="600">
          {passwordExist ? '비밀번호 수정' : '비밀번호 등록'}
        </StyledText>
      </Box>
      {passwordExist ? (
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <LabelComponent labelName="기존 비밀번호" />
          </Grid>
          <Grid item xs={12} md>
            <Box width={{ xs: 'inherit', md: '290px' }}>
              <ReactFormText
                register={register}
                errors={errors}
                name="currentPassword"
                type="password"
              />
            </Box>
          </Grid>
        </Grid>
      ) : null}
      <Box my={2}>
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <LabelComponent labelName="새 비밀번호" />
          </Grid>
          <Grid item xs={12} md>
            <Box width={{ xs: 'inherit', md: '290px' }}>
              <ReactFormText
                register={register}
                errors={errors}
                name="password"
                type="password"
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Grid container alignItems="center" spacing={1}>
        <Grid item>
          <LabelComponent labelName="새 비밀번호 확인" />
        </Grid>
        <Grid item xs={12} md>
          <Box width={{ xs: 'inherit', md: '290px' }}>
            <ReactFormText
              register={register}
              errors={errors}
              name="passwordConfirm"
              type="password"
            />
          </Box>
        </Grid>
      </Grid>
      {message.text ? (
        <Box mt={2}>
          <StyledText fontSize="13px" color={message.status === 200 ? Colors.green : Colors.red}>{message.text}</StyledText>
        </Box>
      ) : null}
      <Box maxWidth="250px" m="0 auto" mt={4}>
        <StyledButton onClick={handleSubmit(updatePass)}>비밀번호 저장</StyledButton>
      </Box>
    </Box>
  );
}

export default PasswordChange;
