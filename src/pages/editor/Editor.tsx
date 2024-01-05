import { auth } from '@/api/firebaseConfig';
import { useRouter } from 'next/navigation';
import LINKS from '@/consts/LINKS';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

function Editor(): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push(LINKS.HOME);
      }
    });
  }, []);

  return <div>Redactor will be here</div>;
}

export default Editor;
