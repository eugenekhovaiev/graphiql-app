import styles from './aboutProject.module.scss';
import TEXT_CONTENT_LOCALIZATION from './TEXT_CONTENT_LOCALIZATION.json';
import ContainerLayout from '../../ContainerLayout';
import { useLanguageContext } from '@/utils/contexts/LangContext';

function AboutProject(): JSX.Element {
  const { language } = useLanguageContext();
  const textContent = TEXT_CONTENT_LOCALIZATION[language];

  return (
    <section className={styles.aboutProject}>
      <ContainerLayout>
        <div className={styles.aboutProject__wrapper}>
          <h2 className={styles.aboutProject__title}>{textContent.title}</h2>
          <p className={styles.aboutProject__description}>
            <span className={styles.textHighlight}>
              {textContent.descriptioStart}
            </span>
            {textContent.description}
          </p>
        </div>
      </ContainerLayout>
    </section>
  );
}

export default AboutProject;
