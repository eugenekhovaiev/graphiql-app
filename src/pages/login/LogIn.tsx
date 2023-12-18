import { SubmitHandler, useForm } from 'react-hook-form';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/api/firebaseConfig';
import { browserLocalPersistence, setPersistence } from 'firebase/auth';
import { AuthFormData } from '@/types';

function LogIn(): JSX.Element {
  const [loginUser] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const { register, handleSubmit } = useForm<AuthFormData>();
  const onSubmit: SubmitHandler<AuthFormData> = ({ email, password }) => {
    try {
      setPersistence(auth, browserLocalPersistence).then(() => {
        loginUser(email, password);
      });
      router.push('/');
    } catch (e) {
      console.error(e);
    }
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
