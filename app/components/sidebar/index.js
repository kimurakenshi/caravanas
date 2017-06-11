import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import { isSidebarOpen } from '../../reducers';
import toggleSidebar from '../../actions/sidebar-action';

class Sidebar extends Component {
  redirect(path) {
    this.props.history.push(path);
  }

  onMenuItemClick(path) {
    this.redirect(path);
    this.props.toggleSidebar();
  }

  render() {
    return (
      <Drawer
        docked={false}
        open={this.props.isOpen}
        onRequestChange={this.props.toggleSidebar}
      >
        <AppBar
          title="Menu"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={this.props.toggleSidebar}
        />
        <MenuItem onClick={() => this.onMenuItemClick('/companies')}>
          Empresas
        </MenuItem>
        <MenuItem onClick={() => this.onMenuItemClick('/')}>
          Caravanas
        </MenuItem>
        <MenuItem onClick={() => this.onMenuItemClick('/movements')}>
          Movimientos
        </MenuItem>
        <MenuItem onClick={() => this.onMenuItemClick('/configuration')}>
          Configuración
        </MenuItem>
      </Drawer>
    );
  }
}

function mapStateToProps(state) {
  return {
    isOpen: isSidebarOpen(state),
  };
}

Sidebar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(connect(
  mapStateToProps,
  {
    toggleSidebar,
  }
)(Sidebar));
