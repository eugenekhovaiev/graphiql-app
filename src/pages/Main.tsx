import StartScreen from '@/components/StartScreen';
import AboutProject from '@/components/AboutProject';
import AboutCourse from '@/components/AboutCourse';
import AboutUs from '@/components/AboutUs';
import { auth } from '@/api/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';

function Main(): JSX.Element {
  const [user] = useAuthState(auth);
  console.log('user', user);

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
