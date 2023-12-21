import styles from './aboutUs.module.scss';
import ContainerLayout from '../ContainerLayout';
import DeveloperCard from './components/DeveloperCard';
import DEVELOPERS_INFO_ENG from '@/consts/DEVELOPERS_INFO';

function AboutUs(): JSX.Element {
  return (
    <section className={styles.aboutUs}>
      <ContainerLayout>
        <div className={styles.aboutUs__wrapper}>
          <h1 className={styles.aboutUs__title}>About Us</h1>
          <div className={styles.aboutUs__cardsContainer}>
            {DEVELOPERS_INFO_ENG.map((item) => (
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
