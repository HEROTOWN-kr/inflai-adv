import React, { useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../../context/AuthContext';
import SocialButtonNew from './SocialButtonNew';
import KakaoIcon from '../../../img/kakao-logo.png';

function KakLogin() {
  const history = useHistory();
  const auth = useContext(AuthContext);

  function saveLoginInfo(info) {
    localStorage.setItem('loginInfo', JSON.stringify({
      ...info
    }));
    history.push('/Join');
  }

  const kakaoLoginForm = () => {
    try {
      const { Kakao } = window;

      Kakao.Auth.loginForm({
        success(authObj) {
          Kakao.API.request({
            url: '/v2/user/me',
            success(response) {
              const { id, kakao_account } = response;
              axios.get('/api/TB_ADVERTISER/kakaoLoginNew', {
                params: {
                  id,
                  email: kakao_account.email,
                  name: kakao_account.profile.nickname,
                  photo: kakao_account.profile.profile_image_url,
                  type: '1',
                  social_type: 'kakao'
                }
              }).then((res) => {
                if (res.status === 200) {
                  const {
                    social_type, userToken, userName, userPhoto
                  } = res.data;
                  auth.login(userToken, userName, social_type, userPhoto);
                  history.push('/');
                } else if (res.status === 201) {
                  const { kakaoData } = res.data;
                  const loginInfo = {
                    type: 'kakao', kakaoData
                  };
                  saveLoginInfo(loginInfo);
                }
              }).catch((err) => {
                alert(err.response.data.message);
              });
            },
            fail(err2) {
              console.log(JSON.stringify(err2));
            }
          });
        },
        fail(err) {
          console.log(JSON.stringify(err));
        }
      });
    } catch (err) {
      alert(err.response.message);
    }
  };

  return (
    <SocialButtonNew onClick={kakaoLoginForm} icon={KakaoIcon} text="카카오 로그인" background="#F7E317" color="#3C1E1E" />
  );
}

export default KakLogin;
