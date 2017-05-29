import React from 'react';
import PageTitle from '../../components/page-title';
import styles from './style/create-movement.scss';
import { CaravanaList } from 'app/containers/caravanas/components';

export default function CreateMovement() {
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

      </div>
    </div>
  );
}
