import { SubmitHandler, useForm } from 'react-hook-form';
import { AuthFormData } from '@/types';
import { useRouter } from 'next/navigation';
import createUser from '@/api/createUser';
import loginUser from '@/api/loginUser';
import styles from './authForm.module.scss';
import ContainerLayout from '@/components/ContainerLayout';

interface Props {
  isSignUp?: boolean;
}

function AuthForm({ isSignUp = false }: Props): JSX.Element {
  const { register, handleSubmit } = useForm<AuthFormData>();
  const router = useRouter();

  const onSubmit: SubmitHandler<AuthFormData> = (data: AuthFormData) => {
    isSignUp ? createUser(data) : loginUser(data);
    router.push('/');
  };

  return (
    <ContainerLayout>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input type="email" {...register('email')} />
        <input type="password" {...register('password')} />
        {isSignUp && <input type="password" {...register('repeatPassword')} />}
        <button type="submit">{isSignUp ? 'Sign Up' : 'Log In'}</button>
      </form>
    </ContainerLayout>
  );
}

export default AuthForm;
