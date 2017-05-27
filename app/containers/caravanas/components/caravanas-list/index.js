import { connect } from 'react-redux';
import { fetchCaravanas } from 'app/actions/caravana-actions';
import { getCaravanas } from 'app/reducers';
import React, { Component } from 'react';
import PageSubtitle from 'app/components/page-subtitle';
import styles from './style/caravanas-list.scss';
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

class CaravanaList extends Component {
  componentDidMount() {
    this.props.fetchCaravanas();
  }

  render() {
    return (
      <div className={styles['caravana-list']}>
        <PageSubtitle title="Caravanas" />

        {this.props.caravanas.length === 0 && (
          <p className={styles['caravana-list-empty']} >
            No existen caravanas asociadas a esta empresa.
          </p>
        )}

        {this.props.caravanas.length > 0 && (
          <Table selectable={false}>
            <TableHeader
              adjustForCheckbox={false}
              displaySelectAll={false}
            >
              <TableRow>
                <TableHeaderColumn>Número</TableHeaderColumn>
                <TableHeaderColumn>Descripción</TableHeaderColumn>
                <TableHeaderColumn>Acciones</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.props.caravanas.map((caravana) => {
                return (
                  <TableRow key={caravana.id}>
                    <TableRowColumn>{caravana.number}</TableRowColumn>
                    <TableRowColumn>{caravana.description}</TableRowColumn>
                    <TableRowColumn>
                      {/*<IconButton iconStyle={{ color: '#FF4081' }}>*/}
                        {/*<ActionRemove onClick={() => { this.props.removeCaravana(caravana.id); }} />*/}
                      {/*</IconButton>*/}
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
  const caravanasEntity = getCaravanas(state);

  return {
    caravanas: caravanasEntity.caravanas,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchCaravanas,
    // removeCompany,
  }
)(CaravanaList);
