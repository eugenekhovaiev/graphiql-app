import AuthForm from '@/components/AuthForm';
import FORM from '@/consts/FORM';
import LINKS from '@/consts/LINKS';
import createUser from '@/api/firebase/createUser';
import ContainerLayout from '@/components/ContainerLayout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/api/firebase/firebaseConfig';

function SignUp(): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push(LINKS.EDITOR);
      }
    });
  }, []);

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
