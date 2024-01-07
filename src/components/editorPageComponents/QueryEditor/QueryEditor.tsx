import styles from './queryEditor.module.scss';
import { useState } from 'react';
import Code from '../Code';
import prettify from '@/utils/prettify';

function QueryEditor(): JSX.Element {
  const [code, setCode] = useState('');

  return (
    <section className={styles.queryEditor}>
      <Code value={code} setValue={setCode} />
      <div className={styles.queryEditor__sidebar}>
        <button
          data-testid="run-button"
          className={styles.queryEditor__sidebarButton}
        >
          <div
            className={`${styles.queryEditor__icon} ${styles.queryEditor__icon_run}`}
          />
        </button>
        <button
          data-testid="prettify-button"
          className={`${styles.queryEditor__sidebarButton} ${styles.queryEditor__sidebarButton_light}`}
          onClick={(): void => {
            setCode(prettify(code));
          }}
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
