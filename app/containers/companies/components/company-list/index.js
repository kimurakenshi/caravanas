import { connect } from 'react-redux';
import { deleteCompany, fetchCompanies, setListMode } from 'app/actions/company-actions';
import { getCompanies, getSettings } from 'app/reducers';
import { saveSettings } from 'app/actions/settings-actions';
import React, { Component } from 'react';
import PageSubtitle from 'app/components/page-subtitle';
import EditCompany from '../edit-company';
import styles from './style/company-list.scss';
import COMPANY_LIST_MODE from './enum';
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
import ActionEdit from 'material-ui/svg-icons/editor/mode-edit';
import Snackbar from 'material-ui/Snackbar';

class CompanyList extends Component {
  constructor(props) {
    super(props);

    this.activateCompany = this.activateCompany.bind(this);
    this.editCompany = this.editCompany.bind(this);

    this.state = {
      showConfirmation: false,
    };
  }

  componentDidMount() {
    this.props.fetchCompanies();
  }

  editCompany(companyId) {
    this.props.setListMode(COMPANY_LIST_MODE.EDIT_MODE, companyId);
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
    const snackbackStyles = {
      backgroundColor: '#FF4081',
      textAlign: 'center',
    };

    if (this.props.viewMode === COMPANY_LIST_MODE.EDIT_MODE) {
      return <EditCompany id={this.props.editCompanyId} />;
    }

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
              {this.props.companies.map((company) => (
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
                          onClick={() => {
                            this.setState({ showConfirmation: false });
                            this.activateCompany(company.id);
                          }}
                        />
                      );
                    })()}
                  </TableRowColumn>
                  <TableRowColumn>
                    <IconButton iconStyle={{ color: '#00BCD4' }} >
                      <ActionEdit
                        onClick={() => {
                          this.setState({ showConfirmation: false });
                          this.editCompany(company.id);
                        }}
                      />
                    </IconButton>
                    <IconButton
                      disabled={company.id === this.props.activeCompanyId}
                      iconStyle={{ color: '#FF4081' }}
                    >
                      <ActionRemove
                        onClick={() => {
                          this.setState({ showConfirmation: true });

                          if (company.id === this.props.activeCompanyId) {
                            return;
                          }

                          this.props.deleteCompany(company.id);
                        }}
                      />
                    </IconButton>
                  </TableRowColumn>
                </TableRow>
                ))}
            </TableBody>
          </Table>
        )}

        <Snackbar
          open={!!this.props.error && this.state.showConfirmation}
          bodyStyle={snackbackStyles}
          message={this.props.error || ''}
          autoHideDuration={4000}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const companyEntity = getCompanies(state);
  const settings = getSettings(state);

  return {
    activeCompanyId: settings.data.activeCompanyId,
    companies: companyEntity.companies,
    error: companyEntity.error,
    editCompanyId: companyEntity.editCompanyId,
    viewMode: companyEntity.viewMode,
  };
}

export default connect(
  mapStateToProps,
  {
    deleteCompany,
    fetchCompanies,
    saveSettings,
    setListMode,
  }
)(CompanyList);
