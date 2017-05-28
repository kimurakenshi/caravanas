import { connect } from 'react-redux';
import { saveCompany } from 'app/actions/company-actions';
import { hasCompany } from 'app/reducers';
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
      description: '',
      errorMessage: '',
      isDirty: false,
      isValid: true,
      name: '',
    };
  }

  onCreate() {
    if (this.validateForm()) {
      this.props.saveCompany({
        name: this.state.name.trim(),
        description: this.state.description.trim(),
      });

      this.setState({
        description: '',
        errorMessage: '',
        isDirty: false,
        isValid: true,
        name: '',
      });
    }
  }

  validateForm() {
    if (isEmpty(this.state.name.trim())) {
      this.setState({
        errorMessage: 'Nombre es requerido',
        isValid: false,
        isDirty: true,
      });

      return false;
    }

    if (this.props.isExistentCompany(this.state.name.trim())) {
      this.setState({
        errorMessage: 'Ya existe una empresa con ese nombre.',
        isValid: false,
        isDirty: true,
      });

      return false;
    }

    return true;
  }

  render() {
    const errorStyle = {
      position: 'absolute',
      bottom: '-7px',
    };

    const {
      name,
      description,
    } = this.state;

    return (
      <div className={styles['create-company']}>
        <PageSubtitle title="Crear Empresa" />

        <TextField
          className={styles['create-company-input']}
          errorStyle={errorStyle}
          floatingLabelText="Nombre"
          errorText={this.state.errorMessage}
          value={name}
          onChange={(event) => this.setState({ name: event.target.value.toUpperCase() })}
        />

        <TextField
          className={styles['create-company-input']}
          floatingLabelText="Descripción"
          value={description}
          onChange={(event) => this.setState({ description: event.target.value })}
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
    isExistentCompany: (name) => hasCompany(state, name),
  };
}

export default connect(
  mapStateToProps,
  {
    saveCompany,
  }
)(CreateCompany);
