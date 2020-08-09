import React from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';

import Countries from './pages/Countries';
import CountryDetails from './pages/CountryDetails';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/countries" component={Countries} />
      <Route exact path="/countries/:countryName" component={CountryDetails} />
      <Route path="/" render={() => <Redirect to="/countries" />} />
    </Switch>
  );
};

export default Routes;
