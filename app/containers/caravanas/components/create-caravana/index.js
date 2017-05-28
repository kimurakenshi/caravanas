import { connect } from 'react-redux';
import { saveCaravana } from 'app/actions/caravana-actions';
import { getSettings, hasCaravana } from 'app/reducers';
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import PageSubtitle from 'app/components/page-subtitle';
import styles from './style/create-caravana.scss';
import Snackbar from 'material-ui/Snackbar';
import isEmpty from 'lodash/isEmpty';

class CreateCaravana extends Component {
  constructor(props) {
    super(props);

    this.onCreate = this.onCreate.bind(this);
    this.onSnackbarClose = this.onSnackbarClose.bind(this);

    this.state = {
      description: '',
      errorMessage: '',
      isDirty: false,
      isValid: true,
      number: '',
      prefix: '',
      showInline: true,
    };
  }

  getCaravanaNumber() {
    let caravanaNumber = this.state.number.trim();

    if (!isEmpty(this.state.prefix.trim())) {
      caravanaNumber = `${this.state.prefix.trim()}${caravanaNumber}`;
    }

    return caravanaNumber;
  }

  onCreate() {
    if (this.validateForm()) {
      this.props.saveCaravana({
        description: this.state.description,
        idCompany: this.props.idCompany,
        number: this.getCaravanaNumber(),
      });

      // Clear the number after saving.
      this.setState({
        number: '',
        description: '',
      });
    }
  }

  onSnackbarClose() {
    this.setState({
      errorMessage: '',
      isDirty: false,
      isValid: true,
      showInline: true,
    });
  }

  validateForm() {
    const caravanaNumber = this.getCaravanaNumber();

    if (isEmpty(this.state.number.trim())) {
      this.setState({
        errorMessage: 'El número de la caravana es requerido',
        showInline: true,
        isValid: false,
        isDirty: true,
      });

      return false;
    }

    if (this.props.isExistentCaravana(caravanaNumber)) {
      this.setState({
        errorMessage: 'El número de caravana que intenta agregar ya existe.',
        showInline: false,
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
      description,
      errorMessage,
      number,
      prefix,
      showInline,
    } = this.state;

    const snackbackStyles = {
      backgroundColor: '#FF4081',
      textAlign: 'center',
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
              value={prefix}
              onChange={(event) => this.setState({ prefix: event.target.value })}
              style={{ width: '100px' }}
            />

            <TextField
              className={styles['create-caravana-input']}
              errorStyle={errorStyle}
              floatingLabelText="Número"
              errorText={showInline && errorMessage}
              value={number}
              onChange={(event) => this.setState({ number: event.target.value })}
            />

            <RaisedButton
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
              value={description}
              onChange={(event) => this.setState({ description: event.target.value })}
            />
          </div>
        </div>

        <Snackbar
          open={!showInline && !isEmpty(errorMessage)}
          bodyStyle={snackbackStyles}
          message={errorMessage}
          onRequestClose={this.onSnackbarClose}
          autoHideDuration={4000}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const settings = getSettings(state);

  return {
    idCompany: settings.data.activeCompanyId,
    isExistentCaravana: (number) => hasCaravana(state, number),
  };
}

export default connect(
  mapStateToProps,
  {
    saveCaravana,
  }
)(CreateCaravana);
