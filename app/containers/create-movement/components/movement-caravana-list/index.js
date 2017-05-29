import { connect } from 'react-redux';
import { removeCaravanaFromDraftMovement } from 'app/actions/movement-actions/movement-draft-action';
import React, { Component } from 'react';
import { getDraftMovements } from 'app/reducers';
import PageSubtitle from 'app/components/page-subtitle';
import styles from './style/movement-caravana-list.scss';

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

class MovementCaravanaList extends Component {
  render() {
    return (
      <div className={styles['movement-caravana-list']}>
        <PageSubtitle title="Movimiento" />

        {this.props.caravanas.length === 0 && (
          <p className={styles['movement-caravana-list-empty']} >
            Comienza agregando caravanas de la lista de la izquierda para crear
            un movimiento.
          </p>
        )}

        {this.props.caravanas.length > 0 && (
          <Table selectable={false}>
            <TableHeader
              adjustForCheckbox={false}
              displaySelectAll={false}
            >
              <TableRow>
                <TableHeaderColumn style={{ width: '200px' }}>Número</TableHeaderColumn>
                <TableHeaderColumn>Eliminar</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.props.caravanas.map((caravana) => (
                <TableRow key={caravana.id}>
                  <TableRowColumn style={{ width: '200px' }}>{caravana.number}</TableRowColumn>
                  <TableRowColumn>
                    <IconButton iconStyle={{ color: '#FF4081' }}>
                      <ActionRemove
                        onClick={() => this.props.removeCaravanaFromDraftMovement(caravana.id)}
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
  const draftMovement = getDraftMovements(state);

  return {
    caravanas: draftMovement.caravanas,
  };
}

export default connect(
  mapStateToProps,
  {
    removeCaravanaFromDraftMovement,
  }
)(MovementCaravanaList);
