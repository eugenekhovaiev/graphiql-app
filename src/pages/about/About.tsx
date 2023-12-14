import styles from './about.module.scss';
import StartScreen from '@/components/StartScreen';
import AboutProject from '@/components/AboutProject';

function AboutPage(): JSX.Element {
  return (
    <main className={styles.about}>
      <StartScreen />
      <AboutProject />
    </main>
  );
}

export default AboutPage;
