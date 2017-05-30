import { connect } from 'react-redux';
import React, { Component } from 'react';
import PageTitle from '../../components/page-title';
import styles from './style/edit-movement.scss';
import { getDraftMovement } from 'app/reducers';
import { CaravanaList } from 'app/containers/caravanas/components';
import { MovementCaravanaList } from '../create-movement/components';
import { saveMovement } from 'app/actions/movement-actions';
import { setDraftMovement } from 'app/actions/movement-actions/movement-draft-action';
import PageSubtitle from 'app/components/page-subtitle';
import RaisedButton from 'material-ui/RaisedButton';
import MOVEMENT_STATUS from 'app/containers/create-movement/enum';

class EditMovement extends Component {
  constructor(props) {
    super(props);

    this.onSave = this.onSave.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  componentDidMount() {
    this.props.setDraftMovement(this.props.match.params.id);
  }

  onSave() {
    this.props.saveMovement(this.props.draftMovement, MOVEMENT_STATUS.IN_PROGRESS);
  }

  onConfirm() {
    this.props.saveMovement(this.props.draftMovement, MOVEMENT_STATUS.CONFIRMED);
  }

  render() {
    const rightPanelStyles = {};

    if (this.props.draftMovement.status === MOVEMENT_STATUS.IN_PROGRESS) {
      rightPanelStyles['float'] = 'right';
    } else {
      rightPanelStyles['float'] = 'none';
    }

    return (
      <div className={styles['edit-movement']}>
        <PageTitle
          className={styles['edit-movement-title']}
          title="Editar Movimiento"
        />

        <p className={styles['edit-movement-created']} >
          Creado el {this.props.draftMovement.creationDate}
        </p>

        {this.props.draftMovement.status === MOVEMENT_STATUS.IN_PROGRESS && (
          <div
            className={styles['edit-movement-left-panel']}>
            <CaravanaList
              showActions={false}
              showAddToMovement
              showCreateMovement={false}
              showDescription={false}
            />
          </div>
        )}

        <div
          style={rightPanelStyles}
          className={styles['edit-movement-right-panel']}
        >
          <PageSubtitle title="Movimiento" />

          {this.props.draftMovement.caravanas.length > 0 && (
            <RaisedButton
              labelStyle={{ fontSize: '12px', verticalAlign: 'sub' }}
              style={{width: '50px', height: '30px', marginTop: '15px' }}
              label="Guardar"
              onClick={this.onSave}
              primary
            />
          )}

          {this.props.draftMovement.status === MOVEMENT_STATUS.IN_PROGRESS && (
            <RaisedButton
              className={styles['edit-movement-action']}
              labelStyle={{ fontSize: '12px', verticalAlign: 'sub' }}
              style={{width: '100px', height: '30px', marginTop: '15px' }}
              label="Confirmar"
              onClick={this.onConfirm}
              default
            />
          )}

          <RaisedButton
            className={styles['edit-movement-action']}
            labelStyle={{ fontSize: '12px', verticalAlign: 'sub' }}
            style={{ width: '80px', height: '30px', marginTop: '15px' }}
            label="Exportar"
            onClick={this.onConfirm}
            secondary
          />

          <MovementCaravanaList
            showDelete={this.props.draftMovement.status === MOVEMENT_STATUS.IN_PROGRESS}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const draftMovement = getDraftMovement(state);

  return {
    draftMovement,
  };
}

export default connect(
  mapStateToProps,
  {
    saveMovement,
    setDraftMovement,
  }
)(EditMovement);
