import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useRouteMatch } from 'react-router-dom';
import NaverLogin from 'react-naver-login';
import AuthContext from '../../../context/AuthContext';
import SocialButtonNew from './SocialButtonNew';
import NaverIcon from '../../../img/naver-icon.png';

function checkLocalHost(hostname) {
  const result = hostname.indexOf('127.0.0.1');
  return result !== -1;
}

function NavLogin() {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const isLocal = checkLocalHost(window.location.origin);
  const NaverLoginId = isLocal ? 'KyWNbHHgcX4ZcIagGtBg' : 'HddfazOY2WePr9AUHcfh';

  function saveLoginInfo(info) {
    localStorage.setItem('loginInfo', JSON.stringify({
      ...info
    }));
    history.push('/Join');
  }

  const responseNaver = (response) => {
    try {
      if (response) {
        const {
          email, id, name, profile_image
        } = response;
        axios.get('/api/TB_ADVERTISER/naverLoginNew', {
          params: {
            id,
            email,
            name,
            profile_image,
            social_type: 'naver'
          }
        }).then((res) => {
          if (res.status === 200) {
            const {
              social_type, userToken, userName, userPhoto
            } = res.data;
            auth.login(userToken, userName, social_type, userPhoto);
            history.push('/');
          } else if (res.status === 201) {
            const { navData } = res.data;
            const loginInfo = {
              type: 'naver', navData
            };
            saveLoginInfo(loginInfo);
          }
        }).catch((err) => {
          alert(err.response.data.message);
        });
      }
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    const { naver } = window;
    if (naver && naver.successCallback) {
      naver.successCallback = data => responseNaver(data);
    }
  }, []);

  return (
    <NaverLogin
            // clientId="4rBF5bJ4y2jKn0gHoSCf"
      clientId={NaverLoginId}
      callbackUrl={`${window.location.origin}/Login`}
      render={props => <SocialButtonNew my="10px" onClick={props.onClick} icon={NaverIcon} text="네이버 로그인" background="#00CE38" color="#FFFFFF" />}
      onSuccess={result => responseNaver(result)}
      onFailure={result => responseNaver(result)}
    />
  );
}

export default NavLogin;
