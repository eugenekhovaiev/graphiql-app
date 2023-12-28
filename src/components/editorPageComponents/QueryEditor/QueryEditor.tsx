import styles from './queryEditor.module.scss';
import Code from '../Code';

function QueryEditor(): JSX.Element {
  return (
    <section className={styles.queryEditor}>
      <Code />
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
