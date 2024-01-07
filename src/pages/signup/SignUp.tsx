import AuthForm from '@/components/AuthForm';
import FORM from '@/consts/FORM';
import LINKS from '@/consts/LINKS';
import createUser from '@/api/firebase/createUser';
import ContainerLayout from '@/components/ContainerLayout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/api/firebase/firebaseConfig';
import { useLanguageContext } from '@/utils/contexts/LangContext';

function SignUp(): JSX.Element {
  const router = useRouter();

  const { language } = useLanguageContext();

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
          title={FORM[language].SIGNUP_TITLE}
          subtitle={FORM[language].SIGNUP_SUBTITLE}
          linkTitle={FORM[language].LOGIN_TITLE}
          linkHref={LINKS.LOGIN}
        />
      </ContainerLayout>
    </main>
  );
}

export default SignUp;
