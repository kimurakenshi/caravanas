import React from 'react';
import styles from './style/page-title.scss';

export default function (props) {
  return (
    <h1 className={styles['page-title']}>
      {props.title}
    </h1>
  );
}
