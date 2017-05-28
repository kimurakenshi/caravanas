import { connect } from 'react-redux';
import { saveCompany } from 'app/actions/company-actions';
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import PageSubtitle from 'app/components/page-subtitle';
import styles from './style/create-company.scss';
import isEmpty from 'lodash/isEmpty';

class CreateCompany extends Component {
  constructor(props) {
    super(props);

    this.onCreate = this.onCreate.bind(this);
    this.state = {
      errorMessage: '',
      isValid: true,
      isDirty: false,
    };
  }

  onCreate() {
    if (this.validateForm()) {
      this.props.saveCompany({
        name: this.nameInput.getValue(),
        description: this.descInput.getValue(),
      });
    }
  }

  validateForm() {
    const isValid = !isEmpty(this.nameInput.getValue());

    this.setState({
      errorMessage: isValid ? '' : 'Nombre es requerido',
      isValid,
      isDirty: true,
    });

    return isValid;
  }

  render() {
    const errorStyle = {
      position: 'absolute',
      bottom: '-7px',
    };

    return (
      <div className={styles['create-company']}>
        <PageSubtitle title="Crear Empresa" />

        <TextField
          className={styles['create-company-input']}
          errorStyle={errorStyle}
          floatingLabelText="Nombre"
          errorText={this.state.errorMessage}
          ref={(input) => { this.nameInput = input; }}
        />

        <TextField
          className={styles['create-company-input']}
          floatingLabelText="Descripción"
          ref={(input) => { this.descInput = input; }}
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

export default connect(
  undefined,
  {
    saveCompany,
  }
)(CreateCompany);
