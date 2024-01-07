'use client';
import styles from './header.module.scss';
import linkStyles from '@/components/ui/LinkElement/linkElement.module.scss';
import buttonStyles from '@/components/ui/Button/button.module.scss';
import TEXT_CONTENT_LOCALIZATION from './TEXT_CONTENT_LOCALIZATION.json';

import closeIcon from '/public/close_round_duotone.svg';

import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import Link from 'next/link';
import ContainerLayout from '@/components/ContainerLayout';
import Notification from '@/components/ui/Notification/Notification';
import Button from '../ui/Button';
import LinkElement from '../ui/LinkElement';

import LINKS from '@/consts/LINKS';
import RESPONSE_STATUS from '@/consts/STATUS_CODES';
import NOTIFICATION from '@/consts/NOTIFICATION';

import signOutUser from '@/api/firebase/signOutUser';
import { auth } from '@/api/firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

import showNotification from '@/utils/showNotification';
import { Language, useLanguageContext } from '@/utils/contexts/LangContext';

function Header(): JSX.Element {
  const [scrollPos, setScrollPos] = useState(0);
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState('');

  const { language, updateLanguage } = useLanguageContext();
  const textContent = TEXT_CONTENT_LOCALIZATION[language];

  const router = useRouter();

  useEffect(() => {
    const handleScroll = (): void => {
      setScrollPos(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);

    onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
  }, []);

  const handleBurgerOpen = (): void => {
    document.body.style.overflowY = 'hidden';
    setIsBurgerOpened(true);
  };

  const handleBurgerClose = (): void => {
    document.body.style.overflowY = 'visible';
    setIsBurgerOpened(false);
  };

  const onLinkClick = (isSignUp: boolean = false): void => {
    router.push(isSignUp ? LINKS.SIGNUP : LINKS.LOGIN);

    if (isBurgerOpened) {
      handleBurgerClose();
    }
  };

  const onLogOutClick = async (): Promise<void> => {
    if (isLoggedIn) {
      try {
        const response = await signOutUser();
        response === RESPONSE_STATUS.SUCCESS &&
          showNotification(
            NOTIFICATION[language].LOGOUT_SUCCESS,
            setSuccessMessage,
            undefined,
            router,
            LINKS.HOME
          );
      } catch (e) {}
    } else {
      showNotification(
        NOTIFICATION[language].USER_ARE_NOT_AUTHORIZED,
        setErrorMessage
      );
    }

    if (isBurgerOpened) {
      handleBurgerClose();
    }
  };

  const handleLanguageChange = (
    event: ChangeEvent<HTMLSelectElement>
  ): void => {
    const newValue = event.target.value;
    setSelectedLanguage(newValue);
    updateLanguage(newValue as Language);
  };

  return (
    <header
      className={`${styles.header} ${
        scrollPos === 0 ? '' : styles.header_scrolling
      }`}
    >
      <ContainerLayout className={styles.header__content}>
        <Link className={styles.header__logo} href={LINKS.HOME}>
          {textContent.logo}
        </Link>
        <nav
          className={`${styles.header__menu} ${
            isBurgerOpened ? styles.header__menu_active : ''
          }`}
        >
          <div className={styles.header__navBar}>
            <LinkElement
              title={textContent.nav.about}
              className={`${styles.header__link} ${
                router.pathname === LINKS.HOME ? linkStyles.link_routed : ''
              }`}
              href={LINKS.HOME}
              onClick={handleBurgerClose}
            />
            {isLoggedIn && (
              <LinkElement
                title={textContent.nav.editor}
                className={`${styles.header__link} ${
                  router.pathname === LINKS.EDITOR ? linkStyles.link_routed : ''
                }`}
                href={LINKS.EDITOR}
                onClick={handleBurgerClose}
              />
            )}
          </div>
          <div className={styles.header__access}>
            <select
              className={styles.header__select}
              value={selectedLanguage}
              onChange={handleLanguageChange}
            >
              <option value="en">EN</option>
              <option value="ru">RU</option>
            </select>
            {!isLoggedIn && (
              <Button
                title={textContent.access.login}
                className={`${styles.header__button} ${
                  scrollPos === 0 ? '' : buttonStyles.button_scrolling
                }`}
                styleType={
                  router.pathname === LINKS.LOGIN ? 'routed' : 'secondary'
                }
                onClick={() => onLinkClick()}
              />
            )}
            {!isLoggedIn && (
              <Button
                title={textContent.access.signup}
                className={`${styles.header__button} ${
                  scrollPos === 0 ? '' : buttonStyles.button_scrolling
                }`}
                styleType={router.pathname === LINKS.SIGNUP ? 'routed' : ''}
                onClick={() => onLinkClick(true)}
              />
            )}
            {isLoggedIn && (
              <Button
                title={textContent.access.signout}
                styleType="secondary"
                onClick={onLogOutClick}
              />
            )}
          </div>
          <div className={styles.header__closeIcon} onClick={handleBurgerClose}>
            <Image src={closeIcon} alt={textContent.access.close} />
          </div>
        </nav>
        <div
          data-testid="burger-menu"
          className={styles.header__burger}
          onClick={handleBurgerOpen}
        >
          <div className={styles.header__burgerLine} />
          <div className={styles.header__burgerLine} />
          <div className={styles.header__burgerLine} />
        </div>
        <div
          data-testid="overlay"
          className={`${styles.header__overlay} ${
            isBurgerOpened ? styles.header__overlay_active : ''
          }`}
          onClick={handleBurgerClose}
        />
        {successMessage && <Notification text={successMessage} />}
        {errorMessage && <Notification text={errorMessage} isError />}
      </ContainerLayout>
    </header>
  );
}

export default Header;
