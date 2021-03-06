import React, { useState } from 'react';
import {
  Route, Switch, useRouteMatch, useHistory
} from 'react-router-dom';
import CampaignType from './CampaignType';
import CampaignCreate from './CampaignCreate/CampaignCreate';
import CampaignRequest from './CampaignRequest';
import CampaignDetail from './CampaignDetail/CampaignDetail';
import PrivateRoute from '../../containers/PrivateRoute';
import CampaignCreateNew from './CampaignCreate/CampaignCreateNew';
import CampaignEdit from './CampaignEdit/CampaignEdit';


function Campaign() {
  const match = useRouteMatch();
  const history = useHistory();

  return (
    <React.Fragment>
      <Switch>
        <PrivateRoute
          path={`${match.url}/Create`}
          component={CampaignCreateNew}
        />
        <PrivateRoute
          path={`${match.url}/Edit/:id`}
          component={CampaignEdit}
        />
        <Route
          path={`${match.url}/Request`}
          render={renderProps => <CampaignRequest {...renderProps} />}
        />
        <Route
          path={`${match.path}/detail/:id`}
          render={renderProps => <CampaignDetail {...renderProps} />}
        />
        <Route
          exact
          path={`${match.url}/`}
          render={renderProps => <CampaignType {...renderProps} />}
        />
      </Switch>
    </React.Fragment>
  );
}

export default Campaign;
