import React, { Component } from 'react';
import styles from './style/companies.scss';
import CreateCompany from './components/create-company';
import PageTitle from '../../components/page-title';

export default class Companies extends Component {
  render() {
    return (
      <div className={styles.companies}>
        <PageTitle title="Companías" />

        <CreateCompany />
      </div>
    );
  }
}
