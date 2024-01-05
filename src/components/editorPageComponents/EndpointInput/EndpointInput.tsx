import styles from './endpointInput.module.scss';
import Button from '@/components/ui/Button';
import { useState } from 'react';
import LOCAL_STORAGE_VALUES from '@/consts/LOCAL_STORAGE_VALUES';
import Notification from '@/components/ui/Notification';
import NOTIFICATION from '@/consts/NOTIFICATION';
import showNotification from '@/utils/showNotification';

interface Props {
  setEndpoint: (endpoint: string) => void;
  setSideMenuOpen: (isSideMenuOpen: boolean) => void;
}

function EndpointInput({ setEndpoint, setSideMenuOpen }: Props): JSX.Element {
  let initialValue;
  if (typeof window !== 'undefined') {
    initialValue = localStorage.getItem(LOCAL_STORAGE_VALUES.ENDPOINT);
  }
  const [value, setValue] = useState<string>(initialValue || '');
  const [isNotification, setNotification] = useState<null | string>(null);

  function handleSubmit(): void {
    setEndpoint(value);
    localStorage.setItem(LOCAL_STORAGE_VALUES.ENDPOINT, `${value}`);
    setSideMenuOpen(false);
    showNotification(NOTIFICATION.URL_CHANGED, setNotification);
  }

  return (
    <div className={styles.endpoint}>
      <input
        className={styles.endpoint__input}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <Button
        title="Change"
        type="button"
        styleType="light"
        callback={handleSubmit}
      />
      {isNotification && <Notification text={NOTIFICATION.URL_CHANGED} />}
    </div>
  );
}

export default EndpointInput;
