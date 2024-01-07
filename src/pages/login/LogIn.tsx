import AuthForm from '@/components/AuthForm';
import FORM from '@/consts/FORM';
import LINKS from '@/consts/LINKS';
import loginUser from '@/api/firebase/loginUser';
import ContainerLayout from '@/components/ContainerLayout';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/api/firebase/firebaseConfig';
import { useRouter } from 'next/router';
import { useLanguageContext } from '@/utils/contexts/LangContext';

function LogIn(): JSX.Element {
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
          onFormSubmit={loginUser}
          title={FORM[language].LOGIN_TITLE}
          subtitle={FORM[language].LOGIN_SUBTITLE}
          linkTitle={FORM[language].SIGNUP_TITLE}
          linkHref={LINKS.SIGNUP}
        />
      </ContainerLayout>
    </main>
  );
}

export default LogIn;
