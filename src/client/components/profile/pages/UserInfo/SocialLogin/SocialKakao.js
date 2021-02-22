import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Grid } from '@material-ui/core';
import AuthContext from '../../../../../context/AuthContext';
import KakaoIcon from '../../../../../img/kakao-logo.png';
import StyledImage from '../../../../../containers/StyledImage';
import StyledText from '../../../../../containers/StyledText';

function SocialKakao() {
  const [kakaoInfo, setKakaoInfo] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const { token } = useContext(AuthContext);

  function getKakaoInfo() {
    axios.get('/api/TB_KAKAO_ADV/getInfo', {
      params: { token }
    }).then((res) => {
      if (res.status === 200) {
        if (res.data.data) {
          setKakaoInfo(res.data.data);
        } else {
          setKakaoInfo({});
        }
      }
    }).catch((err) => {
      alert(err.response.data.message);
    });
  }

  useEffect(() => {
    if (token) getKakaoInfo();
  }, [token]);

  function kakaoDelete() {
    axios.post('/api/TB_KAKAO_ADV/kakaoDelete', { token }).then((res) => {
      if (res.status === 200) {
        getKakaoInfo();
        if (errorMessage) setErrorMessage(null);
      } else if (res.status === 201) {
        setErrorMessage(res.data.message);
      }
    }).catch((err) => {
      alert(err.response.data.message);
    });
  }

  const kakaoLoginForm = () => {
    try {
      const { Kakao } = window;
      Kakao.Auth.loginForm({
        success(authObj) {
          Kakao.API.request({
            url: '/v2/user/me',
            success(response) {
              const { id } = response;
              axios.post('/api/TB_KAKAO_ADV/kakaoAdd', {
                id, token
              }).then((res) => {
                if (res.status === 200) {
                  getKakaoInfo();
                } else if (res.status === 201) {
                  setErrorMessage(res.data.message);
                }
              }).catch((err) => {
                alert(err.response.data.message);
              });
            },
            fail(err2) { console.log(JSON.stringify(err2)); }
          });
        },
        fail(err) { console.log(JSON.stringify(err)); }
      });
    } catch (err) {
      alert(err.response.message);
    }
  };

  return (
    <React.Fragment>
      <Box
        py={2}
        px={2}
        width={{ xs: 'inherit', md: '250px' }}
        border="1px solid #e9ecef"
        css={{ cursor: 'pointer' }}
        onClick={kakaoInfo.KAD_ID ? kakaoDelete : kakaoLoginForm}
      >
        <Grid container justify="center" alignItems="center" spacing={1}>
          <Grid item>
            <StyledImage width="18px" height="18px" src={KakaoIcon} />
          </Grid>
          <Grid item>
            <StyledText>{kakaoInfo.KAD_ID ? '카카오 간편로그인 해제' : '카카오 간편로그인 연결하기'}</StyledText>
          </Grid>
        </Grid>
      </Box>
      {kakaoInfo.KAD_DT ? (
        <Box mt={1}>
          <StyledText fontSize="13px">{`${kakaoInfo.KAD_DT}에 연결되었습니다`}</StyledText>
        </Box>
      ) : null}
      {errorMessage ? (
        <Box my={1}>
          <div className="error-message">{errorMessage}</div>
        </Box>
      ) : null}
    </React.Fragment>
  );
}

export default SocialKakao;
