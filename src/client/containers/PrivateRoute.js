import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const storageName = 'userData';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const data = JSON.parse(localStorage.getItem(storageName));

  return (

  // Show the component only when the user is logged in
  // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={props => (
        data && data.token
          ? <Component {...props} />
          : <Redirect to="/Login" />
      )}
    />
  );
};

export default PrivateRoute;
