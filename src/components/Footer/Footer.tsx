import Image from 'next/image';
import Link from 'next/link';
import ContainerLayout from '../ContainerLayout';
import rssLogo from '../../../public/logo-rs-school.svg';
import ghLogo from '../../../public/logo-github.svg';
import styles from './footer.module.scss';
import LINKS from '@/consts/LINKS';

function Footer(): JSX.Element {
  return (
    <footer className={styles.footer}>
      <ContainerLayout>
        <div className={styles.footer__contentWrapper}>
          <Link
            className={`${styles.footer__sectionWrapper} ${styles.footer__sectionWrapper_alignLeft}`}
            href={LINKS.RSSCHOOL_REACT}
            target="_blank"
          >
            <Image
              src={rssLogo}
              className={styles.footer__rssLogo}
              alt="Rolling Scopes School logo"
              priority={false}
            />
          </Link>
          <div
            className={`${styles.footer__sectionWrapper} ${styles.footer__sectionWrapper_alignCenter}`}
          >
            <span className={styles.footer__copyright}>&copy;</span>
            <span>2023</span>
          </div>
          <Link
            href={LINKS.GITHUB_REPO}
            target="_blank"
            className={`${styles.footer__sectionWrapper} ${styles.footer__sectionWrapper_alignRight}`}
          >
            <Image
              src={ghLogo}
              className={styles.footer__ghLogo}
              alt="GitHub logo"
            />
            <span className={styles.footer__ghText}>View on GitHub</span>
          </Link>
        </div>
      </ContainerLayout>
    </footer>
  );
}

export default Footer;
