import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { AuthFormData } from '@/types';
import loginUser from '@/api/loginUser';

function LogIn(): JSX.Element {
  const router = useRouter();

  const { register, handleSubmit } = useForm<AuthFormData>();
  const onSubmit: SubmitHandler<AuthFormData> = (data: AuthFormData): void => {
    loginUser(data);
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="email" {...register('email')} />
      <input type="password" {...register('password')} />
      <button type="submit">Log In</button>
      <button type="reset">Reset</button>
    </form>
  );
}

export default LogIn;
