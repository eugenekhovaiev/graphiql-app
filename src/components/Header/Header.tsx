import styles from './header.module.scss';
import buttonStyles from '@/components/ui/LinkElement/linkElement.module.scss';
import ContainerLayout from '../ContainerLayout';
import Link from 'next/link';
import signOutUser from '@/api/signOutUser';
import { useState } from 'react';
import Notification from '@/components/ui/Notification/Notification';
import LINKS from '@/consts/LINKS';
import { useRouter } from 'next/navigation';

function Header(): JSX.Element {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();
  const onLogOutClick = (): void => {
    signOutUser(setSuccessMessage);
    setTimeout(() => {
      setSuccessMessage(null);
      router.push(LINKS.HOME);
    }, 1500);
  };
  return (
    <div className={styles.header}>
      <ContainerLayout>
        <div className={styles.header__wrapper}>
          <Link className={buttonStyles.link_light} href={LINKS.HOME}>
            Main
          </Link>
          <Link className={buttonStyles.link_light} href={LINKS.LOGIN}>
            Log In
          </Link>
          <button className={buttonStyles.link_light} onClick={onLogOutClick}>
            Log Out
          </button>
          <Link className={buttonStyles.link_light} href={LINKS.SIGNUP}>
            Sign Up
          </Link>
          <Link className={buttonStyles.link_light} href={LINKS.EDITOR}>
            Editor
          </Link>
        </div>
        {successMessage && <Notification text={successMessage} />}
      </ContainerLayout>
    </div>
  );
}

export default Header;
