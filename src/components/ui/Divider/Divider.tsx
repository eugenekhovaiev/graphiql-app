import React from 'react';
import styles from './divider.module.scss';

function Divider(): JSX.Element {
  return <span data-testid="divider" className={styles.divider} />;
}

export default Divider;
