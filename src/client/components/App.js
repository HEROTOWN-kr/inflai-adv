import React, { useEffect, useState } from 'react';
import NaverLogin from 'react-naver-login';
import axios from 'axios';
import { Box } from '@material-ui/core';
import Main from './main/Main';
import CustomNavBar from './navbar/Navbar';
import Footer from './footer/Footer';
import useAuth from '../hooks/auth.hook';
import AuthContext from '../context/AuthContext';
import SocialButton from './login/SocialButton';
import NaverIcon from '../img/naver-icon.png';


function App() {
  const {
    token, login, logout, userDataUpdate, userPhoto, socialType, userName, ready
  } = useAuth();
  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{
      token, login, logout, userDataUpdate, userPhoto, socialType, userName, isAuthenticated
    }}
    >
      <div className="app-block">
        <div className="app-header">
          <CustomNavBar />
        </div>
        <div className="app-body">
          <Main />
        </div>
        <div className="app-footer">
          <Footer />
        </div>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
