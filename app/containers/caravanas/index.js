import React from 'react';
import styles from './style/caravanas.scss';
import { CreateCaravana, CaravanaList } from './components';
import PageTitle from '../../components/page-title';

export default function Caravanas() {
  return (
    <div className={styles.caravanas}>
      <PageTitle title="Caravanas" />

      <CreateCaravana />

      <div className={styles['caravanas-list']}>
        <CaravanaList showExport />
      </div>
    </div>
  );
}
