/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from '../containers/app';
import Companies from '../containers/companies';
import Caravanas from '../containers/caravanas';
import Configuration from '../containers/configuration';
import Movements from '../containers/movements';
import CreateMovement from '../containers/create-movement';
import EditMovement from '../containers/edit-movement';
import HomeRoute from './components/home-route';

export default () => (
  <App>
    <Switch>
      <Route component={Companies} path="/companies" />
      <Route component={Movements} path="/movements" />
      <Route component={CreateMovement} path="/create-movement" />
      <Route component={EditMovement} path="/edit-movement/:id" />
      <Route component={Configuration} path="/configuration" />
      <HomeRoute exact component={Caravanas} path="/" />
    </Switch>
  </App>
);
