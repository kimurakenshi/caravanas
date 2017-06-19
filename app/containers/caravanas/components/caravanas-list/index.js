import { connect } from 'react-redux';
import EditCaravana from '../edit-caravana';
import { fetchCaravanas, deleteCaravana, setListMode } from 'app/actions/caravana-actions';
import { getCaravanas } from 'app/reducers';
import { addCaravanaToDraftMovement } from 'app/actions/movement-actions/movement-draft-action';
import { exportCaravanas } from 'app/common/file-service';
import React, { Component } from 'react';
import PageSubtitle from 'app/components/page-subtitle';
import styles from './style/caravanas-list.scss';
import CARAVANA_LIST_MODE from './enum';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';
import ActionForward from 'material-ui/svg-icons/content/forward';
import Snackbar from 'material-ui/Snackbar';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import ActionRemove from 'material-ui/svg-icons/content/delete-sweep';
import ActionEdit from 'material-ui/svg-icons/editor/mode-edit';

class CaravanaList extends Component {
  constructor(props) {
    super(props);

    this.editCaravana = this.editCaravana.bind(this);
    this.removeCaravana = this.removeCaravana.bind(this);
    this.onExportAction = this.onExportAction.bind(this);
    this.onConfirmationClose = this.onConfirmationClose.bind(this);

    this.state = {
      showConfirmation: false,
      confirmationMessage: '',
    };
  }
  componentDidMount() {
    this.props.fetchCaravanas();
  }

  editCaravana(caravanaId) {
    this.props.setListMode(CARAVANA_LIST_MODE.EDIT_MODE, caravanaId);
  }

  onConfirmationClose() {
    this.setState({
      showConfirmation: false,
      confirmationMessage: '',
    });
  }

  onExportAction() {
    exportCaravanas(this.props.caravanas)
      .then((response) => {
        this.setState({
          showConfirmation: true,
          confirmationMessage: response,
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

  removeCaravana(caravanaId) {
    this.props.deleteCaravana(caravanaId);
  }

  render() {
    const snackbackStyles = {
      backgroundColor: '#00BCD4',
      textAlign: 'center',
    };

    const {
      showActions,
      showAddToMovement,
      showCreateMovement,
      showDescription,
      showExport,
    } = this.props;

    if (this.props.viewMode === CARAVANA_LIST_MODE.EDIT_MODE) {
      return <EditCaravana id={this.props.editCaravanaId} />;
    }

    return (
      <div className={styles['caravana-list']}>
        <div>
          <div className={styles['caravana-list-header-item']}>
            <PageSubtitle title="Caravanas" />
          </div>
          <div className={styles['caravana-list-header-item-action']}>
            {this.props.caravanas.length > 0 && showCreateMovement &&  (
              <Link
                className={styles['caravana-list-link']}
                to="/create-movement"
              >
                Crear Movimiento
              </Link>
            )}
          </div>

          <div className={styles['caravana-list-header-item-action']}>
            {this.props.caravanas.length > 0 && showExport && (
              <a
                href="#"
                className={styles['caravana-list-link']}
                onClick={this.onExportAction}
              >
                Exportar
              </a>
            )}
          </div>
        </div>

        {this.props.caravanas.length === 0 && (
          <p className={styles['caravana-list-empty']} >
            No existen caravanas asociadas a esta empresa.
          </p>
        )}

        {this.props.caravanas.length > 0 && (
          <div>
            <div className={styles['caravana-list-total']} >
              Total: {this.props.caravanas.length}
            </div>

            <Table selectable={false}>
              <TableHeader
                adjustForCheckbox={false}
                displaySelectAll={false}
              >
                <TableRow>
                  <TableHeaderColumn style={{width: '200px'}}>Número</TableHeaderColumn>
                  {showDescription && (
                    <TableHeaderColumn>Descripción</TableHeaderColumn>
                  )}
                  {showActions && (
                    <TableHeaderColumn style={{textAlign: 'center'}}>Acciones</TableHeaderColumn>
                  )}
                  {showAddToMovement && (
                    <TableHeaderColumn
                      style={{textAlign: 'center', width: '100px'}}
                    >
                      Acciones
                    </TableHeaderColumn>
                  )}
                </TableRow>
              </TableHeader>

              <TableBody displayRowCheckbox={false}>
                {this.props.caravanas.map((caravana) => {
                  return (
                    <TableRow key={caravana.id}>
                      <TableRowColumn style={{width: '200px'}}>{caravana.number}</TableRowColumn>
                      {showDescription && (
                        <TableRowColumn>{caravana.description}</TableRowColumn>
                      )}
                      {showActions && (
                        <TableRowColumn style={{textAlign: 'center'}}>
                          <IconButton iconStyle={{color: '#00BCD4'}}>
                            <ActionEdit onClick={() => {
                              this.editCaravana(caravana.id);
                            }}/>
                          </IconButton>
                          <IconButton iconStyle={{color: '#FF4081'}}>
                            <ActionRemove onClick={() => {
                              this.removeCaravana(caravana.id);
                            }}/>
                          </IconButton>
                        </TableRowColumn>
                      )}
                      {showAddToMovement && (
                        <TableRowColumn style={{textAlign: 'center', width: '100px'}}>
                          <FlatButton
                            label="Agregar"
                            labelStyle={{fontSize: '12px'}}
                            labelPosition="before"
                            onClick={() => this.props.addCaravanaToDraftMovement(caravana)}
                            primary
                            icon={<ActionForward />}
                            style={styles.button}
                          />
                        </TableRowColumn>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}

        <Snackbar
          open={this.state.showConfirmation}
          bodyStyle={snackbackStyles}
          message={this.state.confirmationMessage}
          autoHideDuration={2000}
          onRequestClose={this.onConfirmationClose}
        />
      </div>
    );
  }
}

CaravanaList.defaultProps = {
  showActions: true,
  showCreateMovement: true,
  showDescription: true,
  showAddToMovement: false,
  showExport: false,
};

function mapStateToProps(state) {
  const caravanasEntity = getCaravanas(state);

  return {
    caravanas: caravanasEntity.caravanas,
    editCaravanaId: caravanasEntity.editCaravanaId,
    viewMode: caravanasEntity.viewMode,
  };
}

export default connect(
  mapStateToProps,
  {
    addCaravanaToDraftMovement,
    fetchCaravanas,
    deleteCaravana,
    setListMode,
  }
)(CaravanaList);
