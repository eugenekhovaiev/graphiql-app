import prettify from '@/utils/prettify';
import styles from './sideBar.module.scss';
import showNotification from '@/utils/showNotification';
import NOTIFICATION from '@/consts/NOTIFICATION';
import { useState } from 'react';
import Notification from '@/components/ui/Notification';
import { useLanguageContext } from '@/utils/contexts/LangContext';

interface Props {
  code: string;
  setCode: (code: string) => void;
  GQLRequest: string;
  setGQLRequest: (GQLRequest: string) => void;
}

function SideBar({
  code,
  setCode,
  GQLRequest,
  setGQLRequest,
}: Props): JSX.Element {
  const [notification, setNotification] = useState<null | string>(null);
  const { language } = useLanguageContext();

  function onCodeRun(): void {
    if (code === GQLRequest || code.length === 0) {
      showNotification(
        NOTIFICATION[language].NO_CHANGES_IN_EDITOR,
        setNotification
      );
    } else {
      setGQLRequest(code);
    }
  }

  return (
    <div className={styles.sidebar}>
      <button
        data-testid="run-button"
        className={styles.sidebar__button}
        onClick={onCodeRun}
      >
        <div
          className={`${styles.sidebar__icon} ${styles.sidebar__icon_run}`}
        />
      </button>
      <button
        data-testid="prettify-button"
        className={`${styles.sidebar__button} ${styles.sidebar__button_light}`}
        onClick={(): void => {
          setCode(prettify(code));
        }}
      >
        <div
          className={`${styles.sidebar__icon} ${styles.sidebar__icon_prettify}`}
        />
      </button>
      {notification && <Notification text={notification} />}
    </div>
  );
}

export default SideBar;
