import { connect } from 'react-redux';
import EditCaravana from '../edit-caravana';
import { fetchCaravanas, deleteCaravana, setListMode } from 'app/actions/caravana-actions';
import { getCaravanas } from 'app/reducers';
import React, { Component } from 'react';
import PageSubtitle from 'app/components/page-subtitle';
import styles from './style/caravanas-list.scss';
import CARAVANA_LIST_MODE from './enum';

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
    this.viewCaravanas = this.viewCaravanas.bind(this);
    this.removeCaravana = this.removeCaravana.bind(this);
  }
  componentDidMount() {
    this.props.fetchCaravanas();
  }

  addCaravanaToMovement(caravanaId) {

  }

  editCaravana(caravanaId) {
    this.props.setListMode(caravanaId, CARAVANA_LIST_MODE.EDIT_MODE);
  }

  viewCaravanas() {
    this.props.setListMode(null, CARAVANA_LIST_MODE.VIEW_MODE);
  }

  removeCaravana(caravanaId) {
    // @todo validate this

    this.props.deleteCaravana(caravanaId);
  }

  render() {
    if (this.props.viewMode === CARAVANA_LIST_MODE.EDIT_MODE) {
      return <EditCaravana id={this.props.editCaravanaId} />;
    }

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
                <TableHeaderColumn style={{ textAlign:' center' }}>Acciones</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.props.caravanas.map((caravana) => {
                return (
                  <TableRow key={caravana.id}>
                    <TableRowColumn>{caravana.number}</TableRowColumn>
                    <TableRowColumn>{caravana.description}</TableRowColumn>
                    <TableRowColumn style={{ textAlign: 'center' }}>
                      <IconButton iconStyle={{ color: '#00BCD4' }}>
                        <ActionEdit onClick={() => { this.editCaravana(caravana.id); }} />
                      </IconButton>
                      <IconButton iconStyle={{ color: '#FF4081' }}>
                        <ActionRemove onClick={() => { this.removeCaravana(caravana.id); }} />
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
    fetchCaravanas,
    deleteCaravana,
    setListMode,
  }
)(CaravanaList);
