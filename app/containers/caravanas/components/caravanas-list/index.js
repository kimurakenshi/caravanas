import { connect } from 'react-redux';
import EditCaravana from '../edit-caravana';
import { fetchCaravanas, deleteCaravana, setListMode } from 'app/actions/caravana-actions';
import { getCaravanas } from 'app/reducers';
import { addCaravanaToDraftMovement } from 'app/actions/movement-actions/movement-draft-action';
import React, { Component } from 'react';
import PageSubtitle from 'app/components/page-subtitle';
import styles from './style/caravanas-list.scss';
import CARAVANA_LIST_MODE from './enum';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';
import ActionForward from 'material-ui/svg-icons/content/forward';
import SearchCaravanas from '../search-caravanas';

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

    this.addCaravanaToMovement = this.addCaravanaToMovement.bind(this);
    this.editCaravana = this.editCaravana.bind(this);
    this.removeCaravana = this.removeCaravana.bind(this);
  }
  componentDidMount() {
    this.props.fetchCaravanas();
  }

  addCaravanaToMovement(caravanaId) {

  }

  editCaravana(caravanaId) {
    this.props.setListMode(CARAVANA_LIST_MODE.EDIT_MODE, caravanaId);
  }

  removeCaravana(caravanaId) {
    this.props.deleteCaravana(caravanaId);
  }

  render() {
    const {
      showActions,
      showCreateMovement,
      showDescription,
      showAddToMovement,
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
        </div>

        <div>
          <SearchCaravanas />
        </div>

        {this.props.caravanas.length === 0 && (
          <p className={styles['caravana-list-empty']} >
            No existen caravanas asociadas a esta empresa o no sé encontraron
            caravanas para el criterio de búsqueda actual.
          </p>
        )}

        {this.props.caravanas.length > 0 && (
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
                  <TableHeaderColumn style={{ textAlign: 'center' }}>Acciones</TableHeaderColumn>
                )}
                {showAddToMovement && (
                  <TableHeaderColumn
                    style={{ textAlign: 'center', width: '100px' }}
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
                    <TableRowColumn style={{ width: '200px' }}>{caravana.number}</TableRowColumn>
                    {showDescription && (
                      <TableRowColumn>{caravana.description}</TableRowColumn>
                    )}
                    {showActions && (
                      <TableRowColumn style={{ textAlign: 'center' }}>
                        <IconButton iconStyle={{ color: '#00BCD4' }}>
                          <ActionEdit onClick={() => { this.editCaravana(caravana.id); }} />
                        </IconButton>
                        <IconButton iconStyle={{ color: '#FF4081' }}>
                          <ActionRemove onClick={() => { this.removeCaravana(caravana.id); }} />
                        </IconButton>
                      </TableRowColumn>
                    )}
                    {showAddToMovement && (
                      <TableRowColumn style={{ textAlign: 'center', width: '100px' }}>
                        <FlatButton
                          label="Agregar"
                          labelStyle={{ fontSize: '12px' }}
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
        )}
      </div>
    );
  }
}

CaravanaList.defaultProps = {
  showActions: true,
  showCreateMovement: true,
  showDescription: true,
  showAddToMovement: false,
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
