import styles from './aboutUs.module.scss';
import ContainerLayout from '../ContainerLayout';
import DeveloperCard from './components/DeveloperCard';

function AboutUs(): JSX.Element {
  const cardDescription = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
    sed do eiusmod tempor incididunt ut labore et dolore
    magna aliqua. Phasellus egestas tellus rutrum tellus
    pellentesque eu. Arcu non sodales neque sodales ut etiam
    sit amet. Urna id volutpat lacus laoreet. Sit amet
    porttitor eget dolor morbi.
  `;
  return (
    <section className={styles.aboutUs}>
      <ContainerLayout>
        <div className={styles.aboutUs__wrapper}>
          <h1 className={styles.aboutUs__title}>About Us</h1>
          <div className={styles.aboutUs__cardsContainer}>
            <DeveloperCard
              name="Xeniya Gazizova"
              position="Team leader, Frontend&nbsp;developer"
              description={cardDescription}
              gitHubUrl="https://github.com/XeniyaMV"
            />
            <DeveloperCard
              name="Yevhenii Khovaiev"
              position="Frontend&nbsp;developer"
              description={cardDescription}
              gitHubUrl="https://github.com/eugenekhovaiev"
            />
            <DeveloperCard
              name="Maria Bogdanova"
              position="Frontend&nbsp;developer"
              description={cardDescription}
              gitHubUrl="https://github.com/MashaBogdanova"
            />
          </div>
        </div>
      </ContainerLayout>
    </section>
  );
}

export default AboutUs;
