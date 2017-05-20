import React, { Component } from 'react';
import styles from './style/companies.scss';
import PageTitle from '../../components/page-title';

export default class Companies extends Component {
  render() {
    return (
      <div className={styles.companies}>
        <PageTitle title="Companies" />

      </div>
    );
  }
}
