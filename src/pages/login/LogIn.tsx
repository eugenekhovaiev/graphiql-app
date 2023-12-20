import AuthForm from '@/components/AuthForm/AuthForm';
import FORM from '@/consts/FORM';
import LINKS from '@/consts/LINKS';

function LogIn(): JSX.Element {
  return (
    <AuthForm
      title={FORM.LOGIN_TITLE}
      subtitle={FORM.LOGIN_SUBTITLE}
      linkTitle={FORM.SIGNUP_TITLE}
      linkHref={LINKS.SIGNUP}
    />
  );
}

export default LogIn;
