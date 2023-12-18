import styles from './notification.module.scss';
import Image from 'next/image';
import successIcon from '../../../../public/notification-success.svg';
import errorIcon from '../../../../public/notification-error.svg';

interface Props {
  isError?: boolean;
  text: string;
}

function Notification({ isError = false, text }: Props): JSX.Element {
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
      <p className={styles.notification__text}>{text}</p>
    </div>
  );
}

export default Notification;
