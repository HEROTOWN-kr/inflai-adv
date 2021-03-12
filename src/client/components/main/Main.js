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
import LoginNew from '../loginNew/LoginNew';
import SignUpNew from '../loginNew/SignUpNew';
import Join from '../loginNew/Join';
import Activate from '../loginNew/Activate';
import ResetPassPage from '../loginNew/ResetPassPage';
import Service from '../footer/Service';
import Privacy from '../footer/Privacy';
import MembershipNew from '../membership/MembershipNew';
import TestComponent from '../TestComponent';

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
        path="/MembershipNew"
        render={renderProps => <MembershipNew {...renderProps} />}
      />
      <Route
        path="/Login"
        render={renderProps => <LoginNew {...renderProps} />}
      />
      <Route
        path="/SignUp"
        render={renderProps => <SignUpNew {...renderProps} />}
      />
      <PrivateRoute
        path="/Profile"
        component={Profile}
      />
      <Route
        exact
        path="/LoginNew"
        render={renderProps => <LoginNew {...renderProps} />}
      />
      <Route
        exact
        path="/SignUpNew"
        render={renderProps => <SignUpNew {...renderProps} />}
      />
      <Route
        exact
        path="/Join"
        render={renderProps => <Join {...renderProps} />}
      />
      <Route
        path="/Activate/:hash"
        render={renderProps => <Activate {...renderProps} />}
      />
      <Route
        path="/Reset/:hash"
        render={renderProps => <ResetPassPage {...renderProps} />}
      />
      <Route
        path="/Policy/Service"
        render={props => <Service {...props} />}
      />
      <Route
        path="/Policy/Privacy"
        render={props => <Privacy {...props} />}
      />
      <Route
        path="/InstaDialog"
        render={renderProps => <TestComponent {...renderProps} />}
      />
      <Route
        component={NotFound}
      />
    </Switch>
  );
}

export default Main;
