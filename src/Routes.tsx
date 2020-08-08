import React from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';

import Countries from './pages/Countries';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exatch path="/countries" component={Countries} />
      <Route path="/" render={() => <Redirect to="/countries" />} />
    </Switch>
  );
};

export default Routes;
