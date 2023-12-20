import styles from './notification.module.scss';
import Image from 'next/image';
import successIcon from '../../../../public/notification-success.svg';
import errorIcon from '../../../../public/notification-error.svg';
import Link from 'next/link';
import { useState } from 'react';

interface Props {
  isError?: boolean;
  text: string;
  linkHref?: string;
  linkTitle?: string;
}

function Notification({
  isError = false,
  text,
  linkHref,
  linkTitle,
}: Props): JSX.Element | undefined {
  const [isVisible, setVisible] = useState(true);
  setTimeout(() => {
    setVisible(false);
  }, 1500);
  if (isVisible) {
    return (
      <div
        className={`${styles.notification} ${
          isError && styles.notification_error
        }`}
      >
        <Image
          className={styles.notification__icon}
          src={isError ? errorIcon : successIcon}
          alt="notification"
        />
        <p className={styles.notification__text}>
          {text}
          {linkHref && linkTitle && (
            <Link className={styles.notification__link} href={linkHref}>
              {linkTitle.toLowerCase()}
            </Link>
          )}
        </p>
      </div>
    );
  }
}

export default Notification;
