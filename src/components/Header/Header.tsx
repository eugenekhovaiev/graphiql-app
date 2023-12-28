import styles from './header.module.scss';
import ContainerLayout from '../ContainerLayout';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function Header(): JSX.Element {
  const [scrollPos, setScrollPos] = useState(0);
  const [burgerOpen, setBurgerOpen] = useState(false);

  function handleBurgerClick(): void {
    if (!burgerOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'visible';
    }
    setBurgerOpen(!burgerOpen);
  }

  useEffect(() => {
    const handleScroll = (): void => {
      setScrollPos(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`${styles.header} ${
        scrollPos === 0 ? '' : styles['header_scrolling']
      }`}
    >
      <ContainerLayout className={styles.content}>
        <Link className={styles.logo} href="/">
          GraphiQl Editor
        </Link>
        <nav
          className={`${styles.menu} ${
            burgerOpen ? styles['menu_active'] : ''
          }`}
        >
          <div className={styles['nav-bar']}>
            <Link
              className={`${styles.link} ${styles['link_active']}`}
              // className={styles.link}
              href="about"
              onClick={handleBurgerClick}
            >
              About Us
            </Link>
            <Link className={styles.link} href="/" onClick={handleBurgerClick}>
              Editor
            </Link>
          </div>
          <div className={styles.access}>
            <select className={styles.select}>
              <option value="en">EN</option>
              <option value="ru">RU</option>
            </select>
            <Link
              className={`${styles.link} ${styles['log-in']}`}
              href="#"
              onClick={handleBurgerClick}
            >
              Log In
            </Link>
            <Link
              className={`${styles.link} ${styles['sign-up']}`}
              href="#"
              onClick={handleBurgerClick}
            >
              Sign Up
            </Link>
            {/* <Link className={styles.link} href="#" onClick={handleBurgerClick}>
                Sign Out
              </Link> */}
          </div>
          <div className={styles.close} onClick={handleBurgerClick}>
            <img src="close_round_duotone.svg" alt="close" />
          </div>
        </nav>
        <div className={styles['burger-icon']} onClick={handleBurgerClick}>
          <div className={styles['burger-line']} />
          <div className={styles['burger-line']} />
          <div className={styles['burger-line']} />
        </div>
        <div
          className={`${styles.overlay} ${
            burgerOpen ? styles['overlay_active'] : ''
          }`}
          onClick={handleBurgerClick}
        />
      </ContainerLayout>
    </header>
  );
}

export default Header;
