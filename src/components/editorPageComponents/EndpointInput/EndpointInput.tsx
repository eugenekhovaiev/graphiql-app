import styles from './endpointInput.module.scss';
import Button from '@/components/ui/Button';
import { useState } from 'react';
import LOCAL_STORAGE_VALUES from '@/consts/LOCAL_STORAGE_VALUES';
import Notification from '@/components/ui/Notification';
import NOTIFICATION from '@/consts/NOTIFICATION';
import showNotification from '@/utils/showNotification';

interface Props {
  endpoint: string;
  setEndpoint: (endpoint: string) => void;
  setSideMenuOpen: (isSideMenuOpen: boolean) => void;
}

function EndpointInput({
  endpoint,
  setEndpoint,
  setSideMenuOpen,
}: Props): JSX.Element {
  const [value, setValue] = useState<string>(endpoint);
  const [notification, setNotification] = useState<null | string>(null);

  function handleSubmit(): void {
    if (value === endpoint) {
      showNotification(NOTIFICATION.SAME_URL, setNotification);
    } else {
      setEndpoint(value);
      localStorage.setItem(LOCAL_STORAGE_VALUES.ENDPOINT, `${value}`);
      setSideMenuOpen(false);
      showNotification(NOTIFICATION.URL_CHANGED, setNotification);
    }
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
        onClick={handleSubmit}
      />
      {notification && (
        <Notification
          text={notification}
          isError={notification === NOTIFICATION.SAME_URL}
        />
      )}
    </div>
  );
}

export default EndpointInput;
