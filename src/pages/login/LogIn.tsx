import AuthForm from '@/components/AuthForm/AuthForm';
import FORM from '@/consts/FORM';
import LINKS from '@/consts/LINKS';
import loginUser from '@/api/loginUser';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from '@/api/firebaseConfig';
import ContainerLayout from '@/components/ContainerLayout';

function LogIn(): JSX.Element {
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
