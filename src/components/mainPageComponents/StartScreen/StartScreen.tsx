import styles from './startScreen.module.scss';
import TEXT_CONTENT_LOCALIZATION from './TEXT_CONTENT_LOCALIZATION.json';
import Image from 'next/image';
import ContainerLayout from '../../ContainerLayout';
import graphQLSvg from '../../../../public/qraph-ql.svg';
import { useLanguageContext } from '@/utils/contexts/LangContext';

function StartScreen(): JSX.Element {
  const { language } = useLanguageContext();
  const textContent = TEXT_CONTENT_LOCALIZATION[language];

  return (
    <section className={styles.startScreen}>
      <ContainerLayout>
        <div className={styles.startScreen__wrapper}>
          <div className={styles.startScreen__description}>
            <h1 className={styles.startScreen__title}>{textContent.title}</h1>
            <p className={styles.startScreen__helperText}>
              {textContent.subtitle}
            </p>
          </div>
          <div className={styles.startScreen__imageContainer}>
            <Image
              className={styles.startScreen__image}
              src={graphQLSvg}
              alt={textContent.imageAlt}
            />
          </div>
        </div>
      </ContainerLayout>
    </section>
  );
}

export default StartScreen;
