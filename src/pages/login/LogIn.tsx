import AuthForm from '@/components/AuthForm';
import FORM from '@/consts/FORM';
import LINKS from '@/consts/LINKS';
import loginUser from '@/api/firebase/loginUser';
import ContainerLayout from '@/components/ContainerLayout';

function LogIn(): JSX.Element {
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
