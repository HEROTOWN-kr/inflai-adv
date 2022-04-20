import React, { useState } from 'react';
import { Box, Snackbar } from '@material-ui/core';
import {
  Route, Switch, Redirect, useRouteMatch
} from 'react-router-dom';
import NotFound from '../main/NotFound';
import UserInfo from './pages/UserInfo/UserInfo';
import CampaignInfo from './pages/CampaignInfo/CampaignInfo';
import Alert from '../../containers/Alert';
import MembershipInfo from './pages/MembershipInfo/MembershipInfo';
import MyPage from './MyPage';

function ProfileContent(props) {
  const match = useRouteMatch();

  return (
    <Box height="100%">
      <Switch>
        <Route
          path={`${match.url}/CampaignInfo`}
          render={renderProps => <CampaignInfo {...renderProps} />}
        />
        <Route
          path={`${match.url}/UserInfo`}
          render={renderProps => <UserInfo {...props} />}
        />
        <Route
          path={`${match.url}/MembershipInfo`}
          render={renderProps => <MembershipInfo {...props} />}
        />
        <Route
          path={`${match.path}/MyPage`}
          render={renderProps => <MyPage {...props} />}
        />
        <Route
          exact
          path={`${match.url}/`}
          render={() => (
            <Redirect to={`${match.url}/UserInfo`} />
          )}
        />
        <Route
          component={NotFound}
        />
      </Switch>
    </Box>
  );
}

export default ProfileContent;
