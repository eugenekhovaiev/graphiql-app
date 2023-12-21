'use client';
import styles from './header.module.scss';
import buttonStyles from '@/components/ui/LinkElement/linkElement.module.scss';
import ContainerLayout from '../ContainerLayout';
import Link from 'next/link';
import signOutUser from '@/api/signOutUser';
import { useState } from 'react';
import Notification from '@/components/ui/Notification/Notification';
import LINKS from '@/consts/LINKS';
import { useRouter } from 'next/navigation';
import RESPONSE_STATUS from '@/consts/STATUS_CODES';
import NOTIFICATION from '@/consts/NOTIFICATION';
import { auth } from '@/api/firebaseConfig';

function Header(): JSX.Element {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const onLinkClick = (isSignUp: boolean = false): void => {
    if (auth.currentUser) {
      setErrorMessage(NOTIFICATION.USER_ALREADY_LOGGED_IN);
      setTimeout(() => {
        setErrorMessage(null);
      }, 2000);
    } else {
      router.push(isSignUp ? LINKS.SIGNUP : LINKS.LOGIN);
    }
  };

  const onLogOutClick = async (): Promise<void> => {
    if (auth.currentUser) {
      try {
        const response = await signOutUser();
        if (response === RESPONSE_STATUS.SUCCESS) {
          setSuccessMessage(NOTIFICATION.LOGOUT_SUCCESS);
          setTimeout(() => {
            setSuccessMessage(null);
            router.push(LINKS.HOME);
          }, 2000);
        }
      } catch (e) {}
    } else {
      setErrorMessage(NOTIFICATION.USER_ARE_NOT_AUTHORIZED);
      setTimeout(() => {
        setErrorMessage(null);
      }, 2000);
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
