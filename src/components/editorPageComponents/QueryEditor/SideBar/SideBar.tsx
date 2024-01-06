import prettify from '@/utils/prettify';
import styles from './sideBar.module.scss';

interface Props {
  code: string;
  setCode: (code: string) => void;
}

function SideBar({ code, setCode }: Props): JSX.Element {
  return (
    <div className={styles.sidebar}>
      <button className={styles.sidebar__button}>
        <div
          className={`${styles.sidebar__icon} ${styles.sidebar__icon_run}`}
        />
      </button>
      <button
        className={`${styles.sidebar__button} ${styles.sidebar__button_light}`}
        onClick={(): void => {
          setCode(prettify(code));
        }}
      >
        <div
          className={`${styles.sidebar__icon} ${styles.sidebar__icon_prettify}`}
        />
      </button>
    </div>
  );
}

export default SideBar;
