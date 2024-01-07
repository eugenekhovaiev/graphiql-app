import styles from './not-found.module.scss';
import TEXT_CONTENT_LOCALIZATION from './TEXT_CONTENT_LOCALIZATION.json';
import linkStyles from '../../components/ui/Button/button.module.scss';
import Link from 'next/link';
import ContainerLayout from '@/components/ContainerLayout';
import { useLanguageContext } from '@/utils/contexts/LangContext';

function NotFound(): JSX.Element {
  const { language } = useLanguageContext();
  const textContent = TEXT_CONTENT_LOCALIZATION[language];

  return (
    <ContainerLayout>
      <div className={styles.notFound}>
        <h1 className={styles.notFound__title}>404</h1>
        <h2 className={styles.notFound__subtitle}>{textContent.subtitle}</h2>
        <p className={styles.notFound__text}>{textContent.text}</p>
        <Link href="/" className={linkStyles.button}>
          {textContent.button}
        </Link>
      </div>
    </ContainerLayout>
  );
}

export default NotFound;
