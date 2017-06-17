import React, { Component } from 'react';
import styles from './style/configuration.scss';
import PageTitle from '../../components/page-title';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import { exportConfig, importConfig } from 'app/common/file-service';

export default class Configuration extends Component {
  constructor(props) {
    super(props);

    this.onExportConfig = this.onExportConfig.bind(this);
    this.onImportConfig = this.onImportConfig.bind(this);

    this.state = {
      showConfirmation: false,
      confirmationMessage: '',
    };
  }

  onExportConfig() {
    exportConfig()
      .then((msg) => {
        this.setState({
          showConfirmation: true,
          confirmationMessage: msg,
        });
      })
      .catch((err) => {
        this.setState({
          showConfirmation: true,
          confirmationMessage: err,
        });
      })
    ;
  }

  onImportConfig() {
    importConfig()
      .then((msg) => {
        this.setState({
          showConfirmation: true,
          confirmationMessage: msg,
        });
      })
      .catch((err) => {
        this.setState({
          showConfirmation: true,
          confirmationMessage: err,
        });
      })
    ;
  }

  render() {
    const snackbackStyles = {
      backgroundColor: '#00BCD4',
      textAlign: 'center',
    };

    return (
      <div className={styles.configuration}>
        <PageTitle title="Configuración" />

        <div className={styles['configuration-container']}>
          <div className={styles['configuration-actions']}>
            <RaisedButton
              label="Exportar Datos"
              onClick={this.onExportConfig}
              primary
            />
          </div>

          <div className={styles['configuration-actions']}>
            <RaisedButton
              label="Importar Datos"
              onClick={this.onImportConfig}
              secondary
            />
          </div>
        </div>

        <Snackbar
          open={this.state.showConfirmation}
          bodyStyle={snackbackStyles}
          message={this.state.confirmationMessage}
          autoHideDuration={3000}
        />
      </div>
    );
  }
}
