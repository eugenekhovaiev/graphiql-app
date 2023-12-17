import { FormEvent, useRef } from 'react';
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from 'react-firebase-hooks/auth';
import { auth } from '@/api/firebase';
import { useRouter } from 'next/navigation';

function SignUp(): JSX.Element {
  const formRef = useRef<HTMLFormElement>(null);
  const [createUser] = useCreateUserWithEmailAndPassword(auth);
  const [loginUser] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();
  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      try {
        const userData = await createUser(email, password);
        // todo: check if ok
        loginUser(email, password);
        console.log({ userData });
        router.push('/');
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <input type="email" name="email" />
      <input type="password" name="password" />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUp;