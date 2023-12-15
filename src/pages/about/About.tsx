import styles from './about.module.scss';
import StartScreen from '@/components/StartScreen';
import AboutProject from '@/components/AboutProject';
import AboutCourse from '@/components/AboutCourse';

function AboutPage(): JSX.Element {
  return (
    <main className={styles.about}>
      <StartScreen />
      <AboutProject />
      <AboutCourse />
    </main>
  );
}

export default AboutPage;
