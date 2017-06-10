import React from 'react';
import styles from './style/movements.scss';
import PageTitle from '../../components/page-title';
import { MovementList } from './components';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';

function Movements(props) {
  return (
    <div className={styles.movements}>
      <PageTitle title="Movimientos" />

      <div className={styles['movements-actions']}>
        <FlatButton
          label="Crear Movimiento"
          onClick={() => props.history.push('/create-movement')}
          primary
        />
      </div>

      <MovementList />
    </div>
  );
}

Movements.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Movements);
