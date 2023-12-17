'use client';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/api/firebase';
import { useRouter } from 'next/navigation';

function Editor(): JSX.Element {
  const [user] = useAuthState(auth);
  const router = useRouter();

  if (!user) {
    router.push('/signup');
  }

  return <div>Redactor will be here</div>;
}

export default Editor;
