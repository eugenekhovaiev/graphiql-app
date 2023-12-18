import { auth } from '@/api/firebaseConfig';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from '@firebase/auth';

function Editor(): JSX.Element {
  const router = useRouter();

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      router.push('/login');
    }
  });

  return <div>Redactor will be here</div>;
}

export default Editor;
