import { connect } from 'react-redux';
import { saveCompany, setListMode } from 'app/actions/company-actions';
import { getCompanyById, hasCompany } from 'app/reducers';
import React, { Component } from 'react';
import COMPANY_LIST_MODE from '../company-list/enum';
import Modal from 'app/components/modal';
import RaisedButton from 'material-ui/RaisedButton';
import PageSubtitle from 'app/components/page-subtitle';
import TextField from 'material-ui/TextField';
import isEmpty from 'lodash/isEmpty';
import styles from './style/edit-company.scss';

class EditCompany extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: '',
      isDirty: false,
      isValid: true,
    };

    this.onSaveAction = this.onSaveAction.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  actions = [
    <RaisedButton
      className={styles['edit-company-action']}
      label="Cancelar"
      onClick={() => this.props.setListMode(COMPANY_LIST_MODE.VIEW_MODE)}
      secondary
    />,
    <RaisedButton
      className={styles['edit-company-action']}
      label="Guardar"
      onClick={() => this.onSaveAction()}
      primary
    />,
  ];

  onSaveAction() {
    if (this.validateForm()) {
      this.props.saveCompany({
        ...this.props.company,
        name: this.nameInput.getValue().trim(),
        description: this.descriptionInput.getValue().trim(),
      });

      this.props.setListMode(COMPANY_LIST_MODE.VIEW_MODE);
    }
  }

  validateForm() {
    const companyName = this.nameInput.getValue().trim();

    if (isEmpty(companyName)) {
      this.setState({
        errorMessage: 'Nombre es requerido',
        isValid: false,
        isDirty: true,
      });

      return false;
    }
    if (this.props.isExistentCompany(companyName, this.props.company.id)) {
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
      errorMessage,
    } = this.state;

    return (
      <Modal
        title="Editar Empresa"
        isOpen
        actions={this.actions}
      >
        <div className={styles['edit-company']}>
          <PageSubtitle title="Empresa" />

          <div>
            <TextField
              errorStyle={errorStyle}
              floatingLabelText="Nombre"
              errorText={errorMessage}
              defaultValue={this.props.company.name}
              ref={(input) => { this.nameInput = input; }}
            />
          </div>

          <div>
            <TextField
              multiLine
              floatingLabelText="Descripción"
              defaultValue={this.props.company.description}
              ref={(input) => { this.descriptionInput = input; }}
            />
          </div>
        </div>
      </Modal>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    company: getCompanyById(state, ownProps.id),
    isExistentCompany: (number, excludeId) => hasCompany(state, name, excludeId),
  };
}

export default connect(
  mapStateToProps,
  {
    saveCompany,
    setListMode,
  }
)(EditCompany);
