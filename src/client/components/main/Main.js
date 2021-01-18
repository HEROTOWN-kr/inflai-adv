import React, { useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import '../../css/sub.scss';
import Home from '../home/Home';
import NotFound from './NotFound';
import Campaign from '../campaign/Campaign';
import Membership from '../membership/Membership';
import Login from '../login/Login';
import SignUp from '../signup/SignUp';
import PrivateRoute from '../../containers/PrivateRoute';
import Profile from '../profile/Profile';
import CampaignCreateNew from '../campaign/CampaignCreate/CampaignCreateNew';


function Main() {
  const { pathname } = useLocation();
  useEffect(() => {
    // window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Switch>
      <Route exact path="/" component={Home} />
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
