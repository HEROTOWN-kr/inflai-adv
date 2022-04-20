import React, { createRef } from 'react';
import { makeStyles } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { Close } from '@material-ui/icons';
import Main from './main/Main';
import CustomNavBar from './navbar/Navbar';
import Footer from './footer/Footer';
import useAuth from '../hooks/auth.hook';
import AuthContext from '../context/AuthContext';

const useStyles = makeStyles({
  snackbarCloseIcon: {
    cursor: 'pointer'
  }
});

function App() {
  const {
    token, login, logout, userDataUpdate, userPhoto, socialType, userName, ready
  } = useAuth();
  const isAuthenticated = !!token;
  const classes = useStyles();

  const snackbarRef = createRef();
  const onClickDismiss = key => () => {
    snackbarRef.current.closeSnackbar(key);
  };

  return (
    <AuthContext.Provider value={{
      token, login, logout, userDataUpdate, userPhoto, socialType, userName, isAuthenticated
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
          <div className="app-body">
            <Main />
          </div>
          <div className="app-footer">
            <Footer />
          </div>
        </div>
      </SnackbarProvider>
    </AuthContext.Provider>
  );
}

export default App;
