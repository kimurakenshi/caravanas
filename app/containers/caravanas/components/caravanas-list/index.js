import { connect } from 'react-redux';
import { fetchCaravanas, deleteCaravana } from 'app/actions/caravana-actions';
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

  }

  removeCaravana(caravanaId) {
    // @todo validate this

    this.props.deleteCaravana(caravanaId);
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
                <TableHeaderColumn style={{ 'text-align':'center' }}>Acciones</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.props.caravanas.map((caravana) => {
                return (
                  <TableRow key={caravana.id}>
                    <TableRowColumn>{caravana.number}</TableRowColumn>
                    <TableRowColumn>{caravana.description}</TableRowColumn>
                    <TableRowColumn style={{ 'text-align':'center' }}>
                      <IconButton iconStyle={{ color: '#00BCD4' }}>
                        <ActionEdit onClick={() => { this.editCaravana(caravana.id); }} />
                      </IconButton>
                      {/*<IconButton iconStyle={{ color: '#00BCD4' }}>*/}
                        {/*<ActionRemove onClick={() => { this.addCaravanaToMovement(caravana.id); }} />*/}
                      {/*</IconButton>*/}
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
  };
}

export default connect(
  mapStateToProps,
  {
    fetchCaravanas,
    deleteCaravana,
  }
)(CaravanaList);
