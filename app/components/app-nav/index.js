import React from 'react';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import { openSidebar } from '../../actions/sidebar-action';

function AppNav(props) {
  return (
    <AppBar
      title="Caravanas"
      iconClassNameRight="muidocs-icon-navigation-expand-more"
      onLeftIconButtonTouchTap={props.openSidebar}
    />
  );
}

export default connect(
  undefined,
  {
    openSidebar,
  }
)(AppNav);

