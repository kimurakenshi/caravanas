import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router';
import { withRouter } from 'react-router-dom';
import { getSettings } from '../../reducers';

function HomeRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest} render={props => (
        rest.activeCompanyId ? (
          <Component {...props} />
        ) : (
          <Redirect to="/companies" />
        )
      )}
    />
  );
}

function mapStateToProps(state) {
  const settings = getSettings(state);

  return {
    activeCompanyId: settings.data.activeCompanyId,
  };
}

export default withRouter(connect(
  mapStateToProps,
)(HomeRoute));
