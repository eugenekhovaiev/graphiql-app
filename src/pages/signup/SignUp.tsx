import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from 'react-firebase-hooks/auth';
import { auth } from '@/api/firebaseConfig';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AuthFormData } from '@/types';
import { browserLocalPersistence, setPersistence } from 'firebase/auth';

function SignUp(): JSX.Element {
  const [createUser] = useCreateUserWithEmailAndPassword(auth);
  const [loginUser] = useSignInWithEmailAndPassword(auth);

  const router = useRouter();
  const { register, handleSubmit } = useForm<AuthFormData>();
  const onSubmit: SubmitHandler<AuthFormData> = ({ email, password }) => {
    try {
      createUser(email, password);
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
      <button type="submit">Sign Up</button>
      <button type="reset">Reset</button>
    </form>
  );
}

export default SignUp;
