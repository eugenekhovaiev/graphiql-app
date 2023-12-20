import AuthForm from '@/components/AuthForm/AuthForm';
import FORM from '@/consts/FORM';
import LINKS from '@/consts/LINKS';

function SignUp(): JSX.Element {
  return (
    <AuthForm
      isSignUp
      title={FORM.SIGNUP_TITLE}
      subtitle={FORM.SIGNUP_SUBTITLE}
      linkTitle={FORM.LOGIN_TITLE}
      linkHref={LINKS.LOGIN}
    />
  );
}

export default SignUp;
