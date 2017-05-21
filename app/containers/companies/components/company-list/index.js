import { connect } from 'react-redux';
import { fetchCompanies } from 'app/actions/company-actions/company-fetch-action';
import { getCompanies } from 'app/reducers';
import React, { Component } from 'react';
import PageSubtitle from 'app/components/page-subtitle';
import styles from './style/company-list.scss';

class CompanyList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchCompanies();
  }

  render() {
    return (
      <div className={styles['create-company']}>
        <PageSubtitle title="Empresas" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    companies: getCompanies(state),
  };
}

export default connect(
  mapStateToProps,
  {
    fetchCompanies,
  }
)(CompanyList);
