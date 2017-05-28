import React from 'react';
import AppBar from 'material-ui/AppBar';
import { getCompanyById, getSettings } from 'app/reducers';
import { connect } from 'react-redux';
import { openSidebar } from '../../actions/sidebar-action';
import get from 'lodash/get';

function AppNav(props) {
  const appTitle = props.companyName ? `Caravanas - ${props.companyName}` : 'Caravanas';

  return (
    <AppBar
      title={appTitle}
      iconClassNameRight="muidocs-icon-navigation-expand-more"
      onLeftIconButtonTouchTap={props.openSidebar}
    />
  );
}

function mapStateToProps(state) {
  const settings = getSettings(state);
  let companyName = '';

  if (settings.data.activeCompanyId) {
    const company = getCompanyById(state, settings.data.activeCompanyId);

    companyName = get(company, 'name', '');
  }

  return {
    companyName
  };
}

export default connect(
  mapStateToProps,
  {
    openSidebar,
  }
)(AppNav);

