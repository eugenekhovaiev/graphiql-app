import styles from './not-found.module.scss';
import linkStyles from '../../components/ui/Button/button.module.scss';
import Link from 'next/link';
import ContainerLayout from '@/components/ContainerLayout';

function NotFound(): JSX.Element {
  return (
    <ContainerLayout>
      <div className={styles.notFound}>
        <h1 className={styles.notFound__title}>404</h1>
        <h2 className={styles.notFound__subtitle}>Page couldn’t be found</h2>
        <p>
          The requested page either doesn’t exist or you don’t have access to
          it.
        </p>
        <Link href="/" className={linkStyles.button}>
          Take me Home
        </Link>
      </div>
    </ContainerLayout>
  );
}

export default NotFound;
