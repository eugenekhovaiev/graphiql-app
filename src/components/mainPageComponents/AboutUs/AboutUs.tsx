import styles from './aboutUs.module.scss';
import TEXT_CONTENT_LOCALIZATION from './TEXT_CONTENT_LOCALIZATION.json';
import ContainerLayout from '../../ContainerLayout';
import DeveloperCard from './components/DeveloperCard';
import DEVELOPERS_INFO from '@/consts/DEVELOPERS_INFO';
import { useLanguageContext } from '@/utils/contexts/LangContext';

function AboutUs(): JSX.Element {
  const { language } = useLanguageContext();
  const textContent = TEXT_CONTENT_LOCALIZATION[language];

  return (
    <section className={styles.aboutUs}>
      <ContainerLayout>
        <div className={styles.aboutUs__wrapper}>
          <h2 className={styles.aboutUs__title}>{textContent.title}</h2>
          <div className={styles.aboutUs__cardsContainer}>
            {DEVELOPERS_INFO[language].map((item) => (
              <DeveloperCard
                key={item.name}
                name={item.name}
                imageUrl={item.imageUrl}
                position={item.position}
                description={item.description}
                gitHubUrl={item.gitHubUrl}
              />
            ))}
          </div>
        </div>
      </ContainerLayout>
    </section>
  );
}

export default AboutUs;
