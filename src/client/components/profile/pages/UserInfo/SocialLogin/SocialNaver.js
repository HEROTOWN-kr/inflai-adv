import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Grid } from '@material-ui/core';
import axios from 'axios';
import NaverLogin from 'react-naver-login';
import StyledImage from '../../../../../containers/StyledImage';
import NaverIcon from '../../../../../img/naver-icon.png';
import StyledText from '../../../../../containers/StyledText';
import AuthContext from '../../../../../context/AuthContext';

function checkLocalHost(hostname) {
  const result = hostname.indexOf('127.0.0.1');
  return result !== -1;
}

function SocialNaver() {
  const [naverInfo, setNaverInfo] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const { token } = useContext(AuthContext);
  const isLocal = checkLocalHost(window.location.origin);
  const NaverLoginId = isLocal ? 'KyWNbHHgcX4ZcIagGtBg' : 'HddfazOY2WePr9AUHcfh';

  function getNaverInfo() {
    axios.get('/api/TB_NAVER_ADV/getInfo', {
      params: { token: token || JSON.parse(localStorage.getItem('userData')).token }
    }).then((res) => {
      if (res.status === 200) {
        if (res.data.data) {
          setNaverInfo(res.data.data);
        } else {
          setNaverInfo({});
        }
      }
    }).catch((err) => {
      alert(err.response.data.message);
    });
  }

  function responseNaver(response) {
    if (response) {
      const { id } = response;
      const body = { id, token: JSON.parse(localStorage.getItem('userData')).token || null };

      axios.post('/api/TB_NAVER_ADV/naverAdd', body).then((res) => {
        if (res.status === 200) {
          getNaverInfo();
        } else if (res.status === 201) {
          setErrorMessage(res.data.message);
        }
      }).catch((err) => {
        alert(err.response.data.message);
      });
    }
  }

  function naverDelete() {
    axios.post('/api/TB_NAVER_ADV/naverDelete', { token }).then((res) => {
      if (res.status === 200) {
        getNaverInfo();
        if (errorMessage) setErrorMessage(null);
      } else if (res.status === 201) {
        setErrorMessage(res.data.message);
      }
    }).catch((err) => {
      alert(err.response.data.message);
    });
  }

  useEffect(() => {
    const { naver } = window;
    if (token) {
      getNaverInfo();
      if (naver && naver.successCallback) {
        naver.successCallback = data => responseNaver(data);
      }
    }
  }, [token]);

  return (
    <React.Fragment>
      { naverInfo.NAD_ID ? (
        <React.Fragment>
          <Box
            py={2}
            px={2}
            width={{ xs: 'inherit', md: '250px' }}
            border="1px solid #e9ecef"
            css={{ cursor: 'pointer' }}
            onClick={naverDelete}
          >
            <Grid container justify="center" alignItems="center" spacing={1}>
              <Grid item>
                <StyledImage width="18px" height="18px" src={NaverIcon} />
              </Grid>
              <Grid item>
                <StyledText>네이버 간편로그인 해제</StyledText>
              </Grid>
            </Grid>
          </Box>
          <Box mt={1}>
            <StyledText fontSize="13px">{`${naverInfo.NAD_DT}에 연결되었습니다`}</StyledText>
          </Box>
        </React.Fragment>
      ) : (
        <NaverLogin
          clientId={NaverLoginId}
          callbackUrl={`${window.location.origin}/Profile/UserInfo`}
          render={props => (
            <Box
              py={2}
              px={2}
              width={{ xs: 'inherit', md: '250px' }}
              border="1px solid #e9ecef"
              css={{ cursor: 'pointer' }}
              onClick={props.onClick}
            >
              <Grid container justify="center" spacing={1}>
                <Grid item>
                  <StyledImage width="18px" height="18px" src={NaverIcon} />
                </Grid>
                <Grid item>
                  <StyledText>네이버 간편로그인 연결하기</StyledText>
                </Grid>
              </Grid>
            </Box>
          )}
          onSuccess={result => responseNaver(result)}
          onFailure={result => responseNaver(result)}
        />
      )}
      {errorMessage ? (
        <Box my={1}>
          <div className="error-message">{errorMessage}</div>
        </Box>
      ) : null}
    </React.Fragment>

  );
}

export default SocialNaver;
