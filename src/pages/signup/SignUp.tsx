import AuthForm from '@/components/AuthForm/AuthForm';
import FORM from '@/consts/FORM';
import LINKS from '@/consts/LINKS';
import createUser from '@/api/createUser';

function SignUp(): JSX.Element {
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
