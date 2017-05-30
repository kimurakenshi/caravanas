import { connect } from 'react-redux';
import { removeCaravanaFromDraftMovement } from 'app/actions/movement-actions/movement-draft-action';
import React, { Component } from 'react';
import { getDraftMovement } from 'app/reducers';
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
        {this.props.draftMovement.caravanas.length === 0 && (
          <p className={styles['movement-caravana-list-empty']} >
            Comienza agregando caravanas de la lista de la izquierda para crear
            un movimiento.
          </p>
        )}

        {this.props.draftMovement.caravanas.length > 0 && (
          <Table selectable={false}>
            <TableHeader
              adjustForCheckbox={false}
              displaySelectAll={false}
            >
              <TableRow>
                <TableHeaderColumn style={{ width: '200px' }}>Número</TableHeaderColumn>
                {this.props.showDelete && (
                  <TableHeaderColumn>Eliminar</TableHeaderColumn>
                )}
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.props.draftMovement.caravanas.map((caravana) => (
                <TableRow key={caravana.id}>
                  <TableRowColumn style={{ width: '200px' }}>{caravana.number}</TableRowColumn>
                  {this.props.showDelete && (
                    <TableRowColumn>
                      <IconButton iconStyle={{ color: '#FF4081' }}>
                        <ActionRemove
                          onClick={() => this.props.removeCaravanaFromDraftMovement(caravana.id)}
                        />
                      </IconButton>
                    </TableRowColumn>
                  )}
                </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
      </div>
    );
  }
}

MovementCaravanaList.defaultProps = {
  showDelete: true,
};

function mapStateToProps(state) {
  const draftMovement = getDraftMovement(state);

  return {
    draftMovement,
  };
}

export default connect(
  mapStateToProps,
  {
    removeCaravanaFromDraftMovement,
  }
)(MovementCaravanaList);
