import { connect } from 'react-redux';
import React, { Component } from 'react';
import styles from './style/movement.scss';
import { getMovementById } from 'app/reducers';
import PageSubtitle from 'app/components/page-subtitle';
import MOVEMENT_STATUS from 'app/containers/create-movement/enum';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class Movement extends Component {
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
    const {
      movement
    } = this.props;

    return (
      <div className={styles.movement}>
        <PageSubtitle title="MOVIMIENTO" />

        <div className={styles['movement-details']}>
          <p className={styles['movement-created']} >
            Creado el {movement.creationDate}
          </p>

          <p className={styles['movement-status']} >
            Estado: {this.getStateName(movement.status)}
          </p>
        </div>

        <div className={styles['movement-caravanas']}>
          <p className={styles['movement-caravanas-title']}>
            Caravanas
          </p>

          <div className={styles['movement-caravanas-list']}>
            <Table selectable={false}>
            <TableHeader
              adjustForCheckbox={false}
              displaySelectAll={false}
            >
              <TableRow>
                <TableHeaderColumn style={{width: '200px'}}>Número</TableHeaderColumn>
              </TableRow>
            </TableHeader>

            <TableBody displayRowCheckbox={false}>
              {this.props.movement.caravanas.map((caravana) => (
                <TableRow key={caravana.id}>
                  <TableRowColumn style={{width: '200px'}}>{caravana.number}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const movement = getMovementById(state, ownProps.id);

  return {
    movement,
  };
}

export default connect(
  mapStateToProps,
)(Movement);
