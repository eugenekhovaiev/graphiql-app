import AuthForm from '@/components/AuthForm';
import FORM from '@/consts/FORM';
import LINKS from '@/consts/LINKS';
import createUser from '@/api/firebase/createUser';
import ContainerLayout from '@/components/ContainerLayout';

function SignUp(): JSX.Element {
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
