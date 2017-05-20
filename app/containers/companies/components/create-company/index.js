import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import PageSubtitle from 'app/components/page-subtitle';
import styles from './style/create-company.scss';

export default function CreateCompany() {
  return (
    <div className={styles['create-company']}>
      <PageSubtitle title="Crear Companía" />

      <TextField
        className={styles['create-company-input']}
        floatingLabelText="Nombre de la companía"
      />

      <TextField
        className={styles['create-company-input']}
        floatingLabelText="Descripción"
      />

      <RaisedButton
        className={styles['create-company-action']}
        label="Crear"
        primary
      />
    </div>
  );
}
