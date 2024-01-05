'use client';
import styles from './header.module.scss';
import buttonStyles from '@/components/ui/LinkElement/linkElement.module.scss';
import ContainerLayout from '../ContainerLayout';
import Link from 'next/link';
import signOutUser from '@/api/firebase/signOutUser';
import { useState } from 'react';
import Notification from '@/components/ui/Notification/Notification';
import LINKS from '@/consts/LINKS';
import { useRouter } from 'next/navigation';
import RESPONSE_STATUS from '@/consts/STATUS_CODES';
import NOTIFICATION from '@/consts/NOTIFICATION';
import { auth } from '@/api/firebase/firebaseConfig';
import showNotification from '@/utils/showNotification';

function Header(): JSX.Element {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const onLinkClick = (isSignUp: boolean = false): void => {
    auth.currentUser
      ? showNotification(NOTIFICATION.USER_ALREADY_LOGGED_IN, setErrorMessage)
      : router.push(isSignUp ? LINKS.SIGNUP : LINKS.LOGIN);
  };

  const onLogOutClick = async (): Promise<void> => {
    if (auth.currentUser) {
      try {
        const response = await signOutUser();
        response === RESPONSE_STATUS.SUCCESS &&
          showNotification(
            NOTIFICATION.LOGOUT_SUCCESS,
            setSuccessMessage,
            undefined,
            router,
            LINKS.HOME
          );
      } catch (e) {}
    } else {
      showNotification(NOTIFICATION.USER_ARE_NOT_AUTHORIZED, setErrorMessage);
    }
  };

  return (
    <div className={styles.header}>
      <ContainerLayout>
        <div className={styles.header__wrapper}>
          <Link className={buttonStyles.link_light} href={LINKS.HOME}>
            Main
          </Link>
          <button
            className={buttonStyles.link_light}
            onClick={() => onLinkClick()}
          >
            Log In
          </button>
          <button className={buttonStyles.link_light} onClick={onLogOutClick}>
            Log Out
          </button>
          <button
            className={buttonStyles.link_light}
            onClick={() => onLinkClick(true)}
          >
            Sign Up
          </button>
          <Link className={buttonStyles.link_light} href={LINKS.EDITOR}>
            Editor
          </Link>
        </div>
        {successMessage && <Notification text={successMessage} />}
        {errorMessage && <Notification text={errorMessage} isError />}
      </ContainerLayout>
    </div>
  );
}

export default Header;
