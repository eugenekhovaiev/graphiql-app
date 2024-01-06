import AuthForm from '@/components/AuthForm';
import FORM from '@/consts/FORM';
import LINKS from '@/consts/LINKS';
import loginUser from '@/api/loginUser';
import ContainerLayout from '@/components/ContainerLayout';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/api/firebaseConfig';
import { useRouter } from 'next/router';

function LogIn(): JSX.Element {
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
          onFormSubmit={loginUser}
          title={FORM.LOGIN_TITLE}
          subtitle={FORM.LOGIN_SUBTITLE}
          linkTitle={FORM.SIGNUP_TITLE}
          linkHref={LINKS.SIGNUP}
        />
      </ContainerLayout>
    </main>
  );
}

export default LogIn;
