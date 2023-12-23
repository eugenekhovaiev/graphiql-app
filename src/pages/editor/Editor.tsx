import { auth } from '@/api/firebaseConfig';
import { useRouter } from 'next/navigation';
import LINKS from '@/consts/LINKS';

function Editor(): JSX.Element {
  const router = useRouter();

  if (!auth.currentUser) {
    router.push(LINKS.LOGIN);
  }

  return <div>Redactor will be here</div>;
}

export default Editor;
