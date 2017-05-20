import React from 'react';
import styles from './style/page-subtitle.scss';

export default function PageSubtitle(props) {
  return (
    <h4 className={styles['page-subtitle']}>
      {props.title}
    </h4>
  );
}
