import { auth } from '@/api/firebaseConfig';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from '@firebase/auth';
import LINKS from '@/consts/LINKS';

function Editor(): JSX.Element {
  const router = useRouter();

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      router.push(LINKS.LOGIN);
    }
  });

  return <div>Redactor will be here</div>;
}

export default Editor;
