import StartScreen from 'src/components/mainPageComponents/StartScreen';
import AboutProject from 'src/components/mainPageComponents/AboutProject';
import AboutCourse from 'src/components/mainPageComponents/AboutCourse';
import AboutUs from 'src/components/mainPageComponents/AboutUs';

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
