import styles from './notification.module.scss';
import Image from 'next/image';
import successIcon from '../../../../public/notification-success.svg';
import errorIcon from '../../../../public/notification-error.svg';
import Link from 'next/link';

interface Props {
  isError?: boolean;
  text: string;
  hasLink?: boolean;
  linkHref?: string;
  linkTitle?: string;
}

function Notification({
  isError = false,
  text,
  hasLink,
  linkHref,
  linkTitle,
}: Props): JSX.Element | undefined {
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
        {hasLink && (
          <Link className={styles.notification__link} href={linkHref!}>
            {linkTitle?.toLowerCase()}
          </Link>
        )}
      </p>
    </div>
  );
}

export default Notification;
