import React from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';

import Countries from './pages/Countries';
import CountryDetails from './pages/CountryDetails';
import CountryEdit from './pages/CountryEdit';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/countries" component={Countries} />
      <Route exact path="/countries/:countryName" component={CountryDetails} />
      <Route
        exact
        path="/countries/:countryName/edit"
        component={CountryEdit}
      />
      <Route path="/" render={() => <Redirect to="/countries" />} />
    </Switch>
  );
};

export default Routes;
