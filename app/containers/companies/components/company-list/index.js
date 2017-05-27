import { connect } from 'react-redux';
import { removeCompany, fetchCompanies } from 'app/actions/company-actions';
import { getCompanies, getSettings } from 'app/reducers';
import { saveSettings } from 'app/actions/settings-actions';
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

    this.activateCompany = this.activateCompany.bind(this);
  }

  componentDidMount() {
    this.props.fetchCompanies();
  }

  activateCompany(companyId) {
    const settings = {
      data: {
        activeCompanyId: companyId,
      },
    };

    this.props.saveSettings(settings);
  }

  render() {
    return (
      <div className={styles['company-list']}>
        <PageSubtitle title="Empresas" />

        {this.props.companies.length === 0 && (
          <p className={styles['company-list-empty']} >
            Crear una nueva empresa para poder associar caravanas y movimientos.
          </p>
        )}

        {this.props.companies.length > 0 && (
          <Table selectable={false}>
            <TableHeader
              adjustForCheckbox={false}
              displaySelectAll={false}
            >
              <TableRow>
                <TableHeaderColumn>Nombre</TableHeaderColumn>
                <TableHeaderColumn>Descripcion</TableHeaderColumn>
                <TableHeaderColumn>Activar</TableHeaderColumn>
                <TableHeaderColumn>Eliminar</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.props.companies.map((company) => {
                return (
                  <TableRow key={company.id}>
                    <TableRowColumn>{company.name}</TableRowColumn>
                    <TableRowColumn>{company.description}</TableRowColumn>
                    <TableRowColumn>
                      {(() => {
                        if (company.id === this.props.activeCompanyId) {
                          return (
                            <span className={styles['company-list-active']}>
                              ACTIVA
                            </span>
                          );
                        }

                        return (
                          <Toggle
                            onClick={() => { this.activateCompany(company.id); }}
                          />
                        );
                      })()}
                    </TableRowColumn>
                    <TableRowColumn>
                      <IconButton iconStyle={{ color: '#FF4081' }}>
                        <ActionRemove onClick={() => { this.props.removeCompany(company.id); }} />
                      </IconButton>
                    </TableRowColumn>
                  </TableRow>
                );
              })}

            </TableBody>
          </Table>
        )}
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
    removeCompany,
    saveSettings,
  }
)(CompanyList);
