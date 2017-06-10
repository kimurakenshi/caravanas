import { connect } from 'react-redux';
import React, { Component } from 'react';
import PageTitle from '../../components/page-title';
import styles from './style/create-movement.scss';
import { getDraftMovement } from 'app/reducers';
import { CaravanaList } from 'app/containers/caravanas/components';
import { MovementCaravanaList } from './components';
import { saveMovement } from 'app/actions/movement-actions';
import { initDraftMovement } from 'app/actions/movement-actions/movement-draft-action';
import PageSubtitle from 'app/components/page-subtitle';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import { getSettings } from 'app/reducers';
import { withRouter } from 'react-router-dom';
import MOVEMENT_STATUS from 'app/containers/create-movement/enum';

class CreateMovement extends Component {
  constructor(props) {
    super(props);

    this.onSave = this.onSave.bind(this);

    this.state = {
      showConfirmation: false,
    };
  }

  componentDidMount() {
    this.props.initDraftMovement(this.props.activeCompanyId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.draftMovement && nextProps.draftMovement.id) {
      this.setState({
        showConfirmation: true,
      });

      setTimeout(() => {
        this.props.history.push(`/edit-movement/${nextProps.draftMovement.id}`);
      }, 3000);
    }
  }

  onSave() {
    this.props.saveMovement(this.props.draftMovement, MOVEMENT_STATUS.IN_PROGRESS);
  }

  render() {
    const snackbackStyles = {
      backgroundColor: '#0097A7',
      textAlign: 'center',
    };

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
              labelStyle={{ fontSize: '12px', verticalAlign: 'sub' }}
              style={{ width: '50px', height: '30px', marginTop: '15px' }}
              label="Guardar"
              onClick={this.onSave}
              primary
            />
          )}

          <MovementCaravanaList />

          <Snackbar
            open={this.state.showConfirmation}
            bodyStyle={snackbackStyles}
            message="El movimiento se guardó correctamente"
            autoHideDuration={4000}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const draftMovement = getDraftMovement(state);
  const settings = getSettings(state);

  return {
    draftMovement,
    activeCompanyId: settings.data.activeCompanyId,
  };
}

export default withRouter(connect(
  mapStateToProps,
  {
    saveMovement,
    initDraftMovement,
  }
)(CreateMovement));
