import React, { useContext, useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Divider } from '@material-ui/core';
import axios from 'axios';
import { Colors } from '../../lib/Сonstants';
import StyledText from '../../containers/StyledText';
import ReactFormText from '../../containers/ReactFormText';
import StyledButton from '../../containers/StyledButton';
import NavLogin from './sns/NavLogin';
import KakLogin from './sns/KakLogin';
import StyledBackDrop from '../../containers/StyledBackDrop';
import CompleteDialog from './CompleteDialog';

const defaultValues = {
  email: '',
  password: '',
  passwordConfirm: '',
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
  password: Yup.string()
    .required('비밀번호를 입력해주세요'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], '비밀번호가 일치해야합니다')
    .required('비밀번호 확인해주세요'),
  name: Yup.string()
    .required('이름을 입력해주세요'),
  phone: Yup.string().required('연락처를 입력해주세요').integerString(),
});

function SignUpNew() {
  const [mainError, setMainError] = useState({});
  const [savingMode, setSavingMode] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

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

  function signUp(values) {
    setSavingMode(true);
    axios.post('/api/TB_ADVERTISER/signupNew', values).then((res) => {
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
      bgcolor="#fff"
      border={{ xs: 'medium none color', md: `solid 1px ${Colors.grey}` }}
      py={{ xs: 0, md: 6 }}
      px={{ xs: 2, md: 6 }}
    >
      <StyledText mb="44px" textAlign="center" fontSize="36px">회원가입</StyledText>
      <Box mb={1}>
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
      />
      <Box my={1}>
        <ReactFormText
          register={register}
          errors={errors}
          name="passwordConfirm"
          type="password"
          placeholder="비밀번호 확인"
        />
      </Box>
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
      {mainError.message ? (
        <Box my={1} textAlign="center">
          <div className="error-message">{mainError.message ? mainError.message : null}</div>
        </Box>
      ) : null}
      <Box my={3}>
        <StyledButton
          height={36}
          background="#f50057"
          hoverBackground="#c51162"
          onClick={handleSubmit(signUp)}
        >
            회원가입
        </StyledButton>
      </Box>
      <Divider />
      <Box mt={3}>
        <NavLogin />
        <KakLogin />
      </Box>
      <StyledBackDrop open={savingMode} handleClose={toggleSavingMode} />
      <CompleteDialog open={dialogOpen} handleClose={toggleDialog} />
    </Box>
  );
}

export default SignUpNew;
