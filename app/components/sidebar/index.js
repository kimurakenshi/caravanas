import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import { isSidebarOpen } from '../../reducers';
import { closeSidebar } from '../../actions/sidebar-action';

function Sidebar(props) {
  return (
    <Drawer open={props.isOpen}>
      <AppBar
        title="Caravanas"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        onLeftIconButtonTouchTap={props.closeSidebar}
      />

      <Link to="/" > Caravanas </Link>
      <Link to="/companies" > Companies </Link>
    </Drawer>
  );
}

function mapStateToProps(state) {
  return {
    isOpen: isSidebarOpen(state),
  };
}

export default connect(
  mapStateToProps,
  {
    closeSidebar,
  }
)(Sidebar);
