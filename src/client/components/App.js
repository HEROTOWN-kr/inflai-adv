import React, { createRef } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { Close } from '@material-ui/icons';
import { matchPath, useLocation } from 'react-router-dom';
import Main from './main/Main';
import CustomNavBar from './navbar/Navbar';
import Footer from './footer/Footer';
import useAuth from '../hooks/auth.hook';
import AuthContext from '../context/AuthContext';
import useLoading from '../hooks/useLoading';
import StyledBackDrop from '../containers/StyledBackDrop';

const useStyles = makeStyles({
  snackbarCloseIcon: {
    cursor: 'pointer'
  }
});

function App() {
  const {
    token, login, logout, userDataUpdate, userPhoto, socialType, userName, ready
  } = useAuth();
  const { isLoading, setLoading } = useLoading();

  const isAuthenticated = !!token;
  const classes = useStyles();

  const snackbarRef = createRef();
  const onClickDismiss = key => () => {
    snackbarRef.current.closeSnackbar(key);
  };

  const location = useLocation();
  const { pathname } = location;

  const changeBg = matchPath(pathname, {
    path: [
      '/Campaign',
      '/Campaign/Create',
      '/Campaign/Request',
      '/Profile/UserInfo',
      '/Profile/CampaignInfo',
      '/Profile/MembershipInfo',
    ],
    exact: true,
    strict: true
  });

  const currentBg = changeBg ? '#f8f8f8' : '#fff';

  return (
    <AuthContext.Provider value={{
      token, login, logout, userDataUpdate, userPhoto, socialType, userName, isAuthenticated, isLoading, setLoading
    }}
    >
      <SnackbarProvider
        ref={snackbarRef}
        action={key => (
          <Close className={classes.snackbarCloseIcon} onClick={onClickDismiss(key)} />
        )}
      >
        <div className="app-block">
          <div className="app-header">
            <CustomNavBar />
          </div>
          <Box className="app-body" bgcolor={currentBg}>
            <Main />
          </Box>
          <div className="app-footer">
            <Footer />
          </div>
        </div>
        <StyledBackDrop open={isLoading} />
      </SnackbarProvider>
    </AuthContext.Provider>
  );
}

export default App;
