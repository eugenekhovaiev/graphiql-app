import { FormEvent, useRef } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/api/firebaseConfig';
import { browserLocalPersistence, setPersistence } from 'firebase/auth';

function LogIn(): JSX.Element {
  const formRef = useRef<HTMLFormElement>(null);
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
        setPersistence(auth, browserLocalPersistence).then(() => {
          loginUser(email, password);
        });
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
      <button type="submit">Log In</button>
    </form>
  );
}

export default LogIn;
