import { connect } from 'react-redux';
import { createCompany } from 'app/actions/company-actions/company-create-action';
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import PageSubtitle from 'app/components/page-subtitle';
import styles from './style/create-company.scss';

class CreateCompany extends Component {
  constructor(props) {
    super(props);

    this.onCreate = this.onCreate.bind(this);
  }
  onCreate() {
    this.props.createCompany({
      name: 'coso',
      description: 'something',
    });
  }

  render() {
    return (
      <div className={styles['create-company']}>
        <PageSubtitle title="Crear Empresa" />

        <TextField
          className={styles['create-company-input']}
          floatingLabelText="Nombre"
        />

        <TextField
          className={styles['create-company-input']}
          floatingLabelText="Descripción"
        />

        <RaisedButton
          className={styles['create-company-action']}
          label="Crear"
          onClick={this.onCreate}
          primary
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isOpen: false,
  };
}

export default connect(
  mapStateToProps,
  {
    createCompany,
  }
)(CreateCompany);
