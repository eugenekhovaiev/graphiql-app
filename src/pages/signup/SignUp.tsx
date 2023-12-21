import AuthForm from '@/components/AuthForm/AuthForm';
import FORM from '@/consts/FORM';
import LINKS from '@/consts/LINKS';
import createUser from '@/api/createUser';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from '@/api/firebaseConfig';
import ContainerLayout from '@/components/ContainerLayout';

function SignUp(): JSX.Element {
  const router = useRouter();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      router.push(LINKS.HOME);
    }
  });

  return (
    <main>
      <ContainerLayout>
        <AuthForm
          isSignUp
          onFormSubmit={createUser}
          title={FORM.SIGNUP_TITLE}
          subtitle={FORM.SIGNUP_SUBTITLE}
          linkTitle={FORM.LOGIN_TITLE}
          linkHref={LINKS.LOGIN}
        />
      </ContainerLayout>
    </main>
  );
}

export default SignUp;
