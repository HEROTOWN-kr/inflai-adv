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


function Campaign() {
  const [productInfo, setProductInfo] = useState({});
  const match = useRouteMatch();
  const history = useHistory();

  function saveProductInfo(data) {
    setProductInfo({ ...productInfo, ...data });
  }

  function goTo(url) {
    history.push(`${match.url}/${url}`);
  }

  return (
    <React.Fragment>
      <Switch>
        <PrivateRoute
          path={`${match.url}/Create`}
          component={CampaignCreate}
          saveProductInfo={saveProductInfo}
        />
        <PrivateRoute
          path={`${match.url}/CreateNew`}
          component={CampaignCreateNew}
          saveProductInfo={saveProductInfo}
        />
        {/* <Route
          path={`${match.url}/Create`}
          render={renderProps => <CampaignCreate {...renderProps} saveProductInfo={saveProductInfo} />}
        /> */}
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
          render={renderProps => <CampaignType {...renderProps} productInfo={productInfo} goTo={goTo} />}
        />
      </Switch>
    </React.Fragment>
  );
}

export default Campaign;
