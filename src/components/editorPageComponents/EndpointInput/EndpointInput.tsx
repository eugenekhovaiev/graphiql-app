import styles from './endpointInput.module.scss';
import TEXT_CONTENT_LOCALIZATION from './TEXT_CONTENT_LOCALIZATION.json';
import Button from '@/components/ui/Button';
import { useState } from 'react';
import LOCAL_STORAGE_VALUES from '@/consts/LOCAL_STORAGE_VALUES';
import Notification from '@/components/ui/Notification';
import NOTIFICATION from '@/consts/NOTIFICATION';
import showNotification from '@/utils/showNotification';
import { useLanguageContext } from '@/utils/contexts/LangContext';

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

  const { language } = useLanguageContext();
  const textContent = TEXT_CONTENT_LOCALIZATION[language];

  function handleSubmit(): void {
    setEndpoint(value);
    localStorage.setItem(LOCAL_STORAGE_VALUES.ENDPOINT, `${value}`);
    setSideMenuOpen(false);
    showNotification(NOTIFICATION[language].URL_CHANGED, setNotification);
  }

  return (
    <div className={styles.endpoint}>
      <input
        className={styles.endpoint__input}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <Button
        title={textContent.button}
        type="button"
        styleType="light"
        onClick={handleSubmit}
      />
      {isNotification && (
        <Notification text={NOTIFICATION[language].URL_CHANGED} />
      )}
    </div>
  );
}

export default EndpointInput;
