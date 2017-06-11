import React from 'react';
import styles from './style/configuration.scss';
import PageTitle from '../../components/page-title';
import RaisedButton from 'material-ui/RaisedButton';

export default function Configuration() {
  return (
    <div className={styles.configuration}>
      <PageTitle title="Configuración" />

      <div className={styles['configuration-container']}>
        <div className={styles['configuration-actions']}>
          <RaisedButton
            label="Exportar Datos"
            primary
          />
        </div>

        <div className={styles['configuration-actions']}>
          <RaisedButton
            label="Importar Datos"
            secondary
          />
        </div>
      </div>

    </div>
  );
}
