import styles from './header.module.scss';
import ContainerLayout from '../ContainerLayout';
import Link from 'next/link';
import { signOut } from 'firebase/auth';
import { auth } from '@/api/firebase';

function Header(): JSX.Element {
  // todo: fix error when write the path in url
  return (
    <div className={styles.header}>
      <ContainerLayout>
        <div className={styles.header__wrapper}>
          <Link href="/login">Log In</Link>
          <Link href="/" onClick={() => signOut(auth)}>
            Log Out
          </Link>
          <Link href="/signup">Sign Up</Link>
          <Link href="/editor">Editor</Link>
        </div>
      </ContainerLayout>
    </div>
  );
}

export default Header;
