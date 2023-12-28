'use client';
// <<<<<<< HEAD
import styles from './header.module.scss';
import buttonStyles from '@/components/ui/LinkElement/linkElement.module.scss';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Link from 'next/link';
import ContainerLayout from '@/components/ContainerLayout';
import Notification from '@/components/ui/Notification/Notification';

import LINKS from '@/consts/LINKS';
import RESPONSE_STATUS from '@/consts/STATUS_CODES';
import NOTIFICATION from '@/consts/NOTIFICATION';

import signOutUser from '@/api/signOutUser';
import { auth } from '@/api/firebaseConfig';

import showNotification from '@/utils/showNotification';

function Header(): JSX.Element {
  const [scrollPos, setScrollPos] = useState(0);
  const [burgerOpen, setBurgerOpen] = useState(false);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleBurgerOpen = (): void => {
    // if (!burgerOpen) {
    //   document.body.style.overflowY = 'hidden';
    // } else {
    //   document.body.style.overflowY = 'visible';
    // }
    // setBurgerOpen(!burgerOpen);
    document.body.style.overflowY = 'hidden';
    setBurgerOpen(true);
  };

  const handleBurgerClose = (): void => {
    document.body.style.overflowY = 'visible';
    setBurgerOpen(false);
  };

  useEffect(() => {
    const handleScroll = (): void => {
      setScrollPos(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
  }, []);

  const onLinkClick = (isSignUp: boolean = false): void => {
    auth.currentUser
      ? showNotification(NOTIFICATION.USER_ALREADY_LOGGED_IN, setErrorMessage)
      : router.push(isSignUp ? LINKS.SIGNUP : LINKS.LOGIN);

    if (burgerOpen) {
      handleBurgerClose();
    }
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

    if (burgerOpen) {
      handleBurgerClose();
    }
  };

  return (
    <header
      className={`${styles.header} ${
        scrollPos === 0 ? '' : styles['header_scrolling']
      }`}
    >
      <ContainerLayout className={styles.content}>
        {/* <Link className={styles.logo} href="/">
          GraphiQl Editor
        </Link> */}
        <Link className={styles.logo} href={LINKS.HOME}>
          GraphiQl Editor
        </Link>
        <nav
          className={`${styles.menu} ${
            burgerOpen ? styles['menu_active'] : ''
          }`}
        >
          <div className={styles['nav-bar']}>
            <Link
              // className={`${styles.link} ${styles['link_active']}`}
              className={styles.link}
              href={LINKS.HOME}
              onClick={handleBurgerClose}
            >
              About Us
            </Link>
            <Link
              className={styles.link}
              href={LINKS.EDITOR}
              onClick={handleBurgerClose}
            >
              Editor
            </Link>
          </div>
          <div className={styles.access}>
            <select className={styles.select}>
              <option value="en">EN</option>
              <option value="ru">RU</option>
            </select>
            {/* <Link
              className={`${styles.link} ${styles['log-in']}`}
              href="#"
              onClick={handleBurgerClick}
            >
              Log In
            </Link> */}
            <button
              className={`${buttonStyles.link_light} ${styles.link} ${styles['log-in']}`}
              onClick={() => onLinkClick()}
            >
              Log In
            </button>
            {/* <Link
              className={`${styles.link} ${styles['sign-up']}`}
              href="#"
              onClick={handleBurgerClick}
            >
              Sign Up
            </Link> */}
            <button
              // className={buttonStyles.link_light}
              className={`${buttonStyles.link_light} ${styles.link} ${styles['sign-up']}`}
              onClick={() => onLinkClick(true)}
            >
              Sign Up
            </button>
            {/* <Link className={styles.link} href="#" onClick={handleBurgerClick}>
                Sign Out
              </Link> */}
            <button
              className={`${buttonStyles.link_light} ${styles.link}`}
              onClick={onLogOutClick}
            >
              Sign Out
            </button>
          </div>
          <div className={styles.close} onClick={handleBurgerClose}>
            <img src="close_round_duotone.svg" alt="close" />
          </div>
        </nav>
        <div className={styles['burger-icon']} onClick={handleBurgerOpen}>
          <div className={styles['burger-line']} />
          <div className={styles['burger-line']} />
          <div className={styles['burger-line']} />
        </div>
        <div
          className={`${styles.overlay} ${
            burgerOpen ? styles['overlay_active'] : ''
          }`}
          onClick={handleBurgerClose}
        />
        {successMessage && <Notification text={successMessage} />}
        {errorMessage && <Notification text={errorMessage} isError />}
      </ContainerLayout>
    </header>
    // =======
    // 'use client';
    // import styles from './header.module.scss';
    // import buttonStyles from '@/components/ui/LinkElement/linkElement.module.scss';
    // import ContainerLayout from '../ContainerLayout';
    // import Link from 'next/link';
    // import signOutUser from '@/api/signOutUser';
    // import { useState } from 'react';
    // import Notification from '@/components/ui/Notification/Notification';
    // import LINKS from '@/consts/LINKS';
    // import { useRouter } from 'next/navigation';
    // import RESPONSE_STATUS from '@/consts/STATUS_CODES';
    // import NOTIFICATION from '@/consts/NOTIFICATION';
    // import { auth } from '@/api/firebaseConfig';
    // import showNotification from '@/utils/showNotification';

    // function Header(): JSX.Element {
    //   const [successMessage, setSuccessMessage] = useState<string | null>(null);
    //   const [errorMessage, setErrorMessage] = useState<string | null>(null);
    //   const router = useRouter();
    //   const onLinkClick = (isSignUp: boolean = false): void => {
    //     auth.currentUser
    //       ? showNotification(NOTIFICATION.USER_ALREADY_LOGGED_IN, setErrorMessage)
    //       : router.push(isSignUp ? LINKS.SIGNUP : LINKS.LOGIN);
    //   };

    //   const onLogOutClick = async (): Promise<void> => {
    //     if (auth.currentUser) {
    //       try {
    //         const response = await signOutUser();
    //         response === RESPONSE_STATUS.SUCCESS &&
    //           showNotification(
    //             NOTIFICATION.LOGOUT_SUCCESS,
    //             setSuccessMessage,
    //             undefined,
    //             router,
    //             LINKS.HOME
    //           );
    //       } catch (e) {}
    //     } else {
    //       showNotification(NOTIFICATION.USER_ARE_NOT_AUTHORIZED, setErrorMessage);
    //     }
    //   };

    //   return (
    //     <div className={styles.header}>
    //       <ContainerLayout>
    //         <div className={styles.header__wrapper}>
    //           <Link className={buttonStyles.link_light} href={LINKS.HOME}>
    //             Main
    //           </Link>
    //           <button
    //             className={buttonStyles.link_light}
    //             onClick={() => onLinkClick()}
    //           >
    //             Log In
    //           </button>
    //           <button className={buttonStyles.link_light} onClick={onLogOutClick}>
    //             Log Out
    //           </button>
    //           <button
    //             className={buttonStyles.link_light}
    //             onClick={() => onLinkClick(true)}
    //           >
    //             Sign Up
    //           </button>
    //           <Link className={buttonStyles.link_light} href={LINKS.EDITOR}>
    //             Editor
    //           </Link>
    //         </div>
    //         {successMessage && <Notification text={successMessage} />}
    //         {errorMessage && <Notification text={errorMessage} isError />}
    //       </ContainerLayout>
    //     </div>
    // >>>>>>> sprint-3
  );
}

export default Header;
