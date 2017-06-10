import { connect } from 'react-redux';
import React, { Component } from 'react';
import PageTitle from '../../components/page-title';
import styles from './style/edit-movement.scss';
import { getDraftMovement } from 'app/reducers';
import { CaravanaList } from 'app/containers/caravanas/components';
import { MovementCaravanaList } from '../create-movement/components';
import { confirmMovement, saveMovement } from 'app/actions/movement-actions';
import { setDraftMovement } from 'app/actions/movement-actions/movement-draft-action';
import Modal from 'app/components/modal';
import PageSubtitle from 'app/components/page-subtitle';
import RaisedButton from 'material-ui/RaisedButton';
import MOVEMENT_STATUS from 'app/containers/create-movement/enum';
import Snackbar from 'material-ui/Snackbar';

class EditMovement extends Component {
  constructor(props) {
    super(props);

    this.onSave = this.onSave.bind(this);
    this.onConfirm = this.onConfirm.bind(this);

    this.state = {
      isConfirmMovementAction: false,
      showConfirmation: false,
    };
  }

  componentDidMount() {
    this.props.setDraftMovement(this.props.match.params.id);
  }

  actions = [
    <RaisedButton
      className={styles['edit-movement-actions']}
      label="No"
      onClick={() => this.setState({ isConfirmMovementAction: false })}
    />,
    <RaisedButton
      className={styles['edit-movement-actions']}
      label="Si"
      onClick={() => {
        this.props.confirmMovement(this.props.draftMovement, MOVEMENT_STATUS.CONFIRMED);
        this.setState({ isConfirmMovementAction: false });
      }}
      primary
    />,
  ];

  onSave() {
    this.props.saveMovement(this.props.draftMovement, MOVEMENT_STATUS.IN_PROGRESS);
    this.setState({
      showConfirmation: true,
    });
  }

  onConfirm() {
    this.setState({ isConfirmMovementAction: true });
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
    const rightPanelStyles = {};
    const {
      draftMovement
    } = this.props;

    const snackbackStyles = {
      backgroundColor: '#0097A7',
      textAlign: 'center',
    };

    const pageTitle = draftMovement.status === MOVEMENT_STATUS.IN_PROGRESS ?
      'Editar Movimiento' :
      'Movimiento'
    ;

    if (!draftMovement) {
      return (
        <h4 className={styles['edit-movement-error']}>
          No se pudo encontrar el movimiento solicitado.
        </h4>
      );
    }

    if (this.state.isConfirmMovementAction) {
      return (
        <Modal
          title="Confirmar Movimiento"
          isOpen
          actions={this.actions}
        >
          <p>
            Esta acción actualizará el estado del movimiento a CONFIRMADO y
            eliminará las caravanas del listado de caravanas que estén asociadas
            a este movimiento. Está seguro que desea continuar?
          </p>
        </Modal>
      );
    }

    if (draftMovement.status === MOVEMENT_STATUS.IN_PROGRESS) {
      rightPanelStyles['float'] = 'right';
    } else {
      rightPanelStyles['float'] = 'none';
    }

    return (
      <div className={styles['edit-movement']}>
        <PageTitle
          className={styles['edit-movement-title']}
          title={pageTitle}
        />

        <p className={styles['edit-movement-created']} >
          Creado el {draftMovement.creationDate}
        </p>

        <p className={styles['edit-movement-status']} >
          Estado: {this.getStateName(draftMovement.status)}
        </p>

        {draftMovement.status === MOVEMENT_STATUS.IN_PROGRESS && (
          <div
            className={styles['edit-movement-left-panel']}
          >
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

          <div className={styles['edit-movement-action-section']}>
            {draftMovement.status === MOVEMENT_STATUS.IN_PROGRESS &&
              draftMovement.caravanas.length > 0 && (
              <RaisedButton
                labelStyle={{ fontSize: '12px', verticalAlign: 'sub' }}
                style={{width: '50px', height: '30px', marginTop: '15px' }}
                label="Guardar"
                onClick={this.onSave}
                primary
              />
            )}

            {draftMovement.caravanas.length > 0 &&
              draftMovement.status === MOVEMENT_STATUS.IN_PROGRESS && (
                <RaisedButton
                  className={styles['edit-movement-action']}
                  labelStyle={{ fontSize: '12px', verticalAlign: 'sub' }}
                  style={{width: '100px', height: '30px', marginTop: '15px' }}
                  label="Confirmar"
                  onClick={this.onConfirm}
                  default
                />
            )}

            {draftMovement.caravanas.length > 0 && (
              <RaisedButton
                className={styles['edit-movement-action']}
                labelStyle={{ fontSize: '12px', verticalAlign: 'sub' }}
                style={{ width: '80px', height: '30px', marginTop: '15px' }}
                label="Exportar"
                onClick={this.onConfirm}
                secondary
              />
            )}
          </div>
          <MovementCaravanaList
            showDelete={draftMovement.status === MOVEMENT_STATUS.IN_PROGRESS}
          />
        </div>

        <Snackbar
          open={this.state.showConfirmation}
          bodyStyle={snackbackStyles}
          message="El movimiento se guardó correctamente"
          autoHideDuration={4000}
        />
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
    confirmMovement,
    saveMovement,
    setDraftMovement,
  }
)(EditMovement);
