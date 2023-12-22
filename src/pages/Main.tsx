import StartScreen from '@/components/StartScreen';
import AboutProject from '@/components/AboutProject';
import AboutCourse from '@/components/AboutCourse';
import AboutUs from '@/components/AboutUs';

function Main(): JSX.Element {
  return (
    <main>
      <StartScreen />
      <AboutProject />
      <AboutUs />
      <AboutCourse />
    </main>
  );
}

export default Main;
