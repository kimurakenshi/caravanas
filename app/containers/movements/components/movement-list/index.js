import { connect } from 'react-redux';
import { fetchMovements } from 'app/actions/movement-actions';
import { getCompanyById, getMovements, getSettings } from 'app/reducers';
import React, { Component } from 'react';
import PageSubtitle from 'app/components/page-subtitle';
import styles from './style/movement-list.scss';
import MOVEMENT_STATUS from 'app/containers/create-movement/enum';
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

class MovementList extends Component {
  constructor(props) {
    super(props);

    this.getStateName = this.getStateName.bind(this);
    this.editMovement = this.editMovement.bind(this);
    this.deleteMovement = this.deleteMovement.bind(this);
  }

  componentDidMount() {
    this.props.fetchMovements();
  }

  editMovement(id) {
    console.log('edit');
  }

  deleteMovement(id) {
    console.log('delete');
  }

  getStateName(status) {
    switch (status) {
      case MOVEMENT_STATUS.CONFIRMED: {
        return 'Confirmado';
      }

      default: {
        return 'En Progreso';
      }
    }
  }

  render() {
    if (this.props.movements.length > 0) {
      this.props.movements
        .sort((currentMovement, nextMovement) => {
          return new Date(nextMovement.creationDate) - new Date(currentMovement.creationDate);
        })
      ;
    }

    return (
      <div className={styles['movement-list']}>
        {this.props.movements.length === 0 && (
          <p className={styles['company-list-empty']} >
            No existen movimientos para la empresa actual.
          </p>
        )}

        {this.props.movements.length > 0 && (
          <Table selectable={false}>
            <TableHeader
              adjustForCheckbox={false}
              displaySelectAll={false}
            >
              <TableRow>
                <TableHeaderColumn>Empresa</TableHeaderColumn>
                <TableHeaderColumn>Estado</TableHeaderColumn>
                <TableHeaderColumn>Fecha de creación</TableHeaderColumn>
                <TableHeaderColumn>Acciones</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.props.movements.map((movement) => (
                <TableRow key={movement.id}>
                  <TableRowColumn>{this.props.company.name}</TableRowColumn>
                  <TableRowColumn>{this.getStateName(movement.status)}</TableRowColumn>
                  <TableRowColumn>
                    {movement.creationDate}
                  </TableRowColumn>
                  <TableRowColumn>
                    <IconButton iconStyle={{color: '#00BCD4'}}>
                      <ActionEdit
                        onClick={() => {
                          this.editMovement(movement.id);
                        }}
                      />
                    </IconButton>
                    <IconButton iconStyle={{color: '#FF4081'}}>
                      <ActionRemove
                        onClick={() => {
                          this.props.removeMovement(movement.id);
                        }}
                      />
                    </IconButton>
                  </TableRowColumn>
                </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const movementEntity = getMovements(state);
  const settings = getSettings(state);
  const company = getCompanyById(state, settings.data.activeCompanyId);

  return {
    company,
    movements: movementEntity.movements,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchMovements,
  }
)(MovementList);
