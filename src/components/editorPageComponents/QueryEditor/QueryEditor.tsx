import styles from './queryEditor.module.scss';
import Code from '../Code';
import { useState } from 'react';

function QueryEditor(): JSX.Element {
  const [code, setCode] = useState('');

  return (
    <section className={styles.queryEditor}>
      <Code value={code} setValue={setCode} />
      <div className={styles.queryEditor__sidebar}>
        <button className={styles.queryEditor__sidebarButton}>
          <div
            className={`${styles.queryEditor__icon} ${styles.queryEditor__icon_run}`}
          />
        </button>
        <button
          className={`${styles.queryEditor__sidebarButton} ${styles.queryEditor__sidebarButton_light}`}
        >
          <div
            className={`${styles.queryEditor__icon} ${styles.queryEditor__icon_prettify}`}
          />
        </button>
      </div>
    </section>
  );
}

export default QueryEditor;
