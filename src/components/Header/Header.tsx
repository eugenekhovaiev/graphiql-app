import styles from './header.module.scss';
import ContainerLayout from '../ContainerLayout';
import Link from 'next/link';
import signOutUser from '@/api/signOutUser';
import { useState } from 'react';
import Notification from '@/components/ui/Notification/Notification';

function Header(): JSX.Element {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  return (
    <div className={styles.header}>
      <ContainerLayout>
        <div className={styles.header__wrapper}>
          <Link href="/">Main</Link>
          <Link href="/login">Log In</Link>
          <Link href="/" onClick={() => signOutUser(setSuccessMessage)}>
            Log Out
          </Link>
          <Link href="/signup">Sign Up</Link>
          <Link href="/editor">Editor</Link>
        </div>
        {successMessage && <Notification text={successMessage} />}
      </ContainerLayout>
    </div>
  );
}

export default Header;
