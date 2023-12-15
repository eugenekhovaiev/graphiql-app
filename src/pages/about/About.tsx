import styles from './about.module.scss';
import StartScreen from '@/components/StartScreen';
import AboutProject from '@/components/AboutProject';
import AboutCourse from '@/components/AboutCourse';
import AboutUs from '@/components/AboutUs';

function AboutPage(): JSX.Element {
  return (
    <main className={styles.about}>
      <StartScreen />
      <AboutProject />
      <AboutUs />
      <AboutCourse />
    </main>
  );
}

export default AboutPage;
