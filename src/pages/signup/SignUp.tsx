import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AuthFormData } from '@/types';
import createUser from '@/api/createUser';

function SignUp(): JSX.Element {
  const router = useRouter();
  const { register, handleSubmit } = useForm<AuthFormData>();
  const onSubmit: SubmitHandler<AuthFormData> = (data: AuthFormData) => {
    createUser(data);
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="email" {...register('email')} />
      <input type="password" {...register('password')} />
      <button type="submit">Sign Up</button>
      <button type="reset">Reset</button>
    </form>
  );
}

export default SignUp;
