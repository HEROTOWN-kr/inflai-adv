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
  const [message, setMessage] = useState({
    open: false,
    text: '',
    type: 'success'
  });

  const messageClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setMessage({ ...message, open: false });
  };

  return (
    <Box height="100%">
      <Switch>
        <Route
          path={`${match.url}/CampaignInfo`}
          render={renderProps => <CampaignInfo {...renderProps} />}
        />
        <Route
          path={`${match.url}/UserInfo`}
          render={renderProps => <UserInfo {...props} setMessage={setMessage} />}
        />
        <Route
          path={`${match.url}/MembershipInfo`}
          render={renderProps => <MembershipInfo {...props} setMessage={setMessage} />}
        />
        <Route
          path={`${match.path}/MyPage`}
          render={renderProps => <MyPage {...props} setMessage={setMessage} />}
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
      <Snackbar
        open={message.open}
        autoHideDuration={4000}
        onClose={messageClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={messageClose} severity={message.type}>
          {message.text}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ProfileContent;
