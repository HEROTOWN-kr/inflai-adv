import React, { useContext, useEffect, useState } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import '../../css/sub.scss';
import axios from 'axios';
import Home from '../home/Home';
import NotFound from './NotFound';
import Campaign from '../campaign/Campaign';
import Membership from '../membership/Membership';
import Login from '../login/Login';
import SignUp from '../signup/SignUp';
import PrivateRoute from '../../containers/PrivateRoute';
import Profile from '../profile/Profile';
import AuthContext from '../../context/AuthContext';

function Main() {
  const [isMember, setIsMember] = useState(false);
  const { token } = useContext(AuthContext);
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  function checkMembership() {
    axios.get('/api/TB_SUBSCRIPTION/checkMembership', {
      params: { token }
    }).then((res) => {
      if (res.status === 200) {
        setIsMember(true);
      } else {
        setIsMember(false);
      }
    }).catch(err => alert(err));
  }

  useEffect(() => {
    if (token) {
      checkMembership();
    } else {
      setIsMember(false);
    }
  }, [token]);

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={props => <Home {...props} isMember={isMember} />}
      />
      <Route
        path="/Campaign"
        render={props => <Campaign {...props} />}
      />
      <Route
        path="/Membership"
        render={renderProps => <Membership {...renderProps} />}
      />
      <Route
        path="/Login"
        render={renderProps => <Login {...renderProps} />}
      />
      <Route
        path="/SignUp"
        render={renderProps => <SignUp {...renderProps} />}
      />
      <PrivateRoute
        path="/Profile"
        component={Profile}
      />
      {/* <Route
        path="/Profile"
        render={renderProps => <Profile {...renderProps} />}
      /> */}
      <Route
        component={NotFound}
      />
    </Switch>
  );
}

export default Main;
