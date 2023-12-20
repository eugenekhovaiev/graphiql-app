import AuthForm from '@/components/AuthForm/AuthForm';
import FORM from '@/consts/FORM';
import LINKS from '@/consts/LINKS';
import createUser from '@/api/createUser';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from '@/api/firebaseConfig';

function SignUp(): JSX.Element {
  const router = useRouter();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      router.push(LINKS.HOME);
    }
  });

  return (
    <AuthForm
      isSignUp
      onFormSubmit={createUser}
      title={FORM.SIGNUP_TITLE}
      subtitle={FORM.SIGNUP_SUBTITLE}
      linkTitle={FORM.LOGIN_TITLE}
      linkHref={LINKS.LOGIN}
    />
  );
}

export default SignUp;
