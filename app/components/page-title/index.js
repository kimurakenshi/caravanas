import React from 'react';
import styles from './style/page-title.scss';
import classNames from 'classnames';

export default function PageTitle(props) {
  return (
    <h2 className={classNames(styles['page-title'], props.className)} >
      {props.title.toUpperCase()}
    </h2>
  );
}
