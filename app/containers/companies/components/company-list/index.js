import { connect } from 'react-redux';
import { fetchCompanies } from 'app/actions/company-actions/company-fetch-action';
import { getCompanies, getSettings } from 'app/reducers';
import React, { Component } from 'react';
import PageSubtitle from 'app/components/page-subtitle';
import styles from './style/company-list.scss';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Toggle from 'material-ui/Toggle';
import IconButton from 'material-ui/IconButton';
import ActionRemove from 'material-ui/svg-icons/content/delete-sweep';

class CompanyList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchCompanies();
  }

  render() {
    return (
      <div className={styles['create-list']}>
        <PageSubtitle title="Empresas" />
        <div>
          <Table selectable={false}>
            <TableHeader
              adjustForCheckbox={false}
              displaySelectAll={false}
            >
              <TableRow>
                <TableHeaderColumn>Nombre</TableHeaderColumn>
                <TableHeaderColumn>Descripcion</TableHeaderColumn>
                <TableHeaderColumn>Activa</TableHeaderColumn>
                <TableHeaderColumn>Acciones</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.props.companies.map((company) => {
                return (
                  <TableRow key={company.id}>
                    <TableRowColumn>{company.name}</TableRowColumn>
                    <TableRowColumn>{company.description}</TableRowColumn>
                    <TableRowColumn>
                      <Toggle defaultToggled={company.id === this.props.activeCompanyId} />
                    </TableRowColumn>
                    <TableRowColumn>
                      <IconButton iconStyle={{color: '#FF4081'}}>
                        <ActionRemove />
                      </IconButton>
                    </TableRowColumn>
                  </TableRow>
                );
              })}

            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const companyEntity = getCompanies(state);
  const settings = getSettings(state);

  return {
    companies: companyEntity.companies,
    activeCompanyId: settings.data.activeCompanyId,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchCompanies,
  }
)(CompanyList);
