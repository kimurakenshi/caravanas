import { connect } from 'react-redux';
import { createCaravana } from 'app/actions/caravana-actions';
import { getSettings } from 'app/reducers';
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import PageSubtitle from 'app/components/page-subtitle';
import styles from './style/create-caravana.scss';
import isEmpty from 'lodash/isEmpty';

class CreateCaravana extends Component {
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
      let caravanaNumber = this.nroInput.getValue().trim();

      if (!isEmpty(this.prefijoInput.getValue().trim())) {
        caravanaNumber = `${this.prefijoInput.getValue().trim()}${this.nroInput.getValue().trim()}`;
      }

      this.props.createCaravana({
        description: this.descInput.getValue(),
        idCompany: this.props.idCompany,
        number: caravanaNumber,
      });

      // Clear the number after saving.
      this.nroInput.getInputNode().value = '';
    }
  }

  validateForm() {
    const isValid = !isEmpty(this.nroInput.getValue());

    this.setState({
      errorMessage: isValid ? '' : 'El número de la caravana es requerido',
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
      <div className={styles['create-caravana']}>
        <PageSubtitle title="Crear Caravana" />

        <div className={styles['create-caravana-container']}>
          <div>
            <TextField
              className={styles['create-caravana-input']}
              errorStyle={errorStyle}
              floatingLabelText="Prefijo"
              ref={(input) => {
                this.prefijoInput = input;
              }}
              style={{ width: '100px' }}
            />

            <TextField
              className={styles['create-caravana-input']}
              errorStyle={errorStyle}
              floatingLabelText="Número"
              errorText={this.state.errorMessage}
              ref={(input) => {
                this.nroInput = input;
              }}
            />

            <RaisedButton
              className={styles['create-caravana-action']}
              label="Crear"
              onClick={this.onCreate}
              primary
            />
          </div>

          <div>
            <TextField
              multiLine
              className={styles['create-caravana-input']}
              floatingLabelText="Descripción"
              ref={(input) => {
                this.descInput = input;
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const settings = getSettings(state);

  return {
    idCompany: settings.data.activeCompanyId,
  };
}

export default connect(
  mapStateToProps,
  {
    createCaravana,
  }
)(CreateCaravana);
