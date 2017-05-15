/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from '../containers/app';
import Companies from '../containers/companies';
import Caravanas from '../containers/caravanas';
import HomeRouter from './components/home-route';

export default () => (
  <App>
    <Switch>
      <Route component={Companies} path="/companies" />
      <HomeRouter exact component={Caravanas} path="/" />
    </Switch>
  </App>
);
