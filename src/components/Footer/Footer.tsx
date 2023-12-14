import Image from 'next/image';
import Link from 'next/link';
import ContainerLayout from '../ContainerLayout';
import styles from './footer.module.scss';

function Footer(): JSX.Element {
  return (
    <footer className={styles.footer}>
      <ContainerLayout>
        <div className={styles.footer__contentWrapper}>
          <Link href="https://rs.school/" target="_blank">
            <Image
              src="./logo-rs-school.svg"
              width={88}
              height={36}
              alt="Rolling Scopes School logo"
            />
          </Link>
          <div className={styles.footer__sectionWrapper}>
            <span className={styles.footer__copyright}>&copy;</span>
            <span>2023</span>
          </div>
          <Link
            href="https://github.com/XeniyaMV/graphiql-app"
            target="_blank"
            className={styles.footer__sectionWrapper}
          >
            <Image
              src="./logo-github.svg"
              width={25}
              height={25}
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
