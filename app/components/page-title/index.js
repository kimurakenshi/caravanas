import React from 'react';
import styles from './style/page-title.scss';

export default function PageTitle(props) {
  return (
    <h2 className={styles['page-title']}>
      {props.title}
    </h2>
  );
}
