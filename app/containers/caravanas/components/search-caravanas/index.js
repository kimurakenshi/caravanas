import { connect } from 'react-redux';
import { fetchCaravanas } from 'app/actions/caravana-actions';
import React from 'react';
import TextField from 'material-ui/TextField';

function SearchCaravanas(props) {
  return (
    <TextField
      floatingLabelText="Buscar caravana"
      onChange={(event) => props.fetchCaravanas(event.target.value.toUpperCase())}
      ref={(input) => { this.searchInput = input; }}
      style={{ width: '400px' }}
    />
  );
}

export default connect(
  undefined,
  {
    fetchCaravanas,
  }
)(SearchCaravanas);
