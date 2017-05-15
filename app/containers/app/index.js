// @flow
import React, { Component } from 'react';
import type { Children } from 'react';
import AppNav from '../../components/app-nav/index';
import Sidebar from '../../components/sidebar/index';

export default class App extends Component {
  props: {
    children: Children
  };

  render() {
    return (
      <div>
        <AppNav title="Caravanas" />
        <Sidebar />

        {this.props.children}
      </div>
    );
  }
}
