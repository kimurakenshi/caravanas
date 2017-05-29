import { connect } from 'react-redux';
import React, { Component } from 'react';
import PageTitle from '../../components/page-title';
import styles from './style/create-movement.scss';
import { getDraftMovements } from 'app/reducers';
import { CaravanaList } from 'app/containers/caravanas/components';
import { MovementCaravanaList } from './components';
import { saveMovement } from 'app/actions/movement-actions';
import { initDraftMovement } from 'app/actions/movement-actions/movement-draft-action';
import PageSubtitle from 'app/components/page-subtitle';
import RaisedButton from 'material-ui/RaisedButton';
import { getSettings } from 'app/reducers';
import MOVEMENT_STATUS from 'app/containers/create-movement/enum';

export class CreateMovement extends Component {
  constructor(props) {
    super(props);

    this.onSave = this.onSave.bind(this);
  }

  componentDidMount() {
    this.props.initDraftMovement(this.props.activeCompanyId);
  }

  onSave() {
    this.props.saveMovement(this.props.draftMovement, MOVEMENT_STATUS.IN_PROGRESS);
  }

  render() {
    return (
      <div className={styles['create-movement']}>
        <PageTitle title="Nuevo Movimiento" />

        <div className={styles['create-movement-left-panel']}>
          <CaravanaList
            showActions={false}
            showAddToMovement
            showCreateMovement={false}
            showDescription={false}
          />
        </div>

        <div className={styles['create-movement-right-panel']}>
          <PageSubtitle title="Movimiento" />

          {this.props.draftMovement.caravanas.length > 0 && (
            <RaisedButton
              labelStyle={{fontSize: '12px', verticalAlign: 'sub'}}
              style={{width: '50px', height: '30px', marginTop: '15px'}}
              label="Guardar"
              onClick={this.onSave}
              primary
            />
          )}

          <MovementCaravanaList />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const draftMovement = getDraftMovements(state);
  const settings = getSettings(state);

  return {
    draftMovement,
    activeCompanyId: settings.data.activeCompanyId,
  };
}

export default connect(
  mapStateToProps,
  {
    saveMovement,
    initDraftMovement,
  }
)(CreateMovement);
