import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import AuthContext from '../../context/AuthContext';

function LogOutButton() {
  const { logout } = useContext(AuthContext);
  const { Kakao, gapi, FB } = window;
  const history = useHistory();

  function clickLogout() {
    gapi.load('auth2', () => {
      const auth2 = gapi.auth2.getAuthInstance({
        client_id: '997274422725-gb40o5tv579csr09ch7q8an63tfmjgfo.apps.googleusercontent.com'
      });
      if (auth2) {
        auth2.disconnect();
      }
    });
    FB.getLoginStatus((response) => {
      if (response.status === 'connected') {
        FB.logout();
      }
    });
    if (Kakao.Auth.getAccessToken()) {
      Kakao.Auth.logout(() => {
        // console.log(Kakao.Auth.getAccessToken());
      });
    }
    logout();
    history.push('/');
  }

  return (
    <Button variant="contained" color="secondary" className="login-button" onClick={clickLogout}>
        로그아웃
    </Button>
  );
}

export default LogOutButton;
