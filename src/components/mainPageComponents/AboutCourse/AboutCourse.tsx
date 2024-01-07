import styles from './aboutCourse.module.scss';
import TEXT_CONTENT_LOCALIZATION from './TEXT_CONTENT_LOCALIZATION.json';
import buttonStyles from '../../ui/Button/button.module.scss';
import ContainerLayout from '../../ContainerLayout';
import Link from 'next/link';
import LINKS from '@/consts/LINKS';
import { useLanguageContext } from '@/utils/contexts/LangContext';

function AboutCourse(): JSX.Element {
  const { language } = useLanguageContext();
  const textContent = TEXT_CONTENT_LOCALIZATION[language];

  return (
    <section className={styles.aboutCourse}>
      <ContainerLayout>
        <div className={styles.aboutCourse__wrapper}>
          <h2 className={styles.aboutCourse__title}>{textContent.title}</h2>
          <p className={styles.aboutCourse__description}>
            <span className={styles.textHighlight}>
              {textContent.descriptionStart}
            </span>
            {textContent.description.p1}
          </p>
          <p className={styles.aboutCourse__description}>
            {textContent.description.p2}
          </p>

          <Link
            className={buttonStyles.button}
            target="_blank"
            href={LINKS.RSSCHOOL_REACT}
          >
            {textContent.button}
          </Link>
        </div>
      </ContainerLayout>
    </section>
  );
}

export default AboutCourse;
