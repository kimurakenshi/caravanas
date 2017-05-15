import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Caravanas extends Component {
  // componentDidMount() {
  //   this.props.history.push('/companies');
  // }

  render() {
    return (
      <h1>Caravanas</h1>
    );
  }
}

export default withRouter(Caravanas);
