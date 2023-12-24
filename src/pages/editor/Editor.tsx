import { auth } from '@/api/firebaseConfig';
import { useRouter } from 'next/navigation';
import LINKS from '@/consts/LINKS';
import styles from './editor.module.scss';
import ResponseViewer from 'src/pages/editor/ResponseViewer';
import QueryEditor from '@/pages/editor/QueryEditor';
import VariablesEditor from 'src/pages/editor/VariablesEditor';
import HeadersEditor from '@/pages/editor/HeadersEditor';
import Documentation from '@/pages/editor/Documentation';

function Editor(): JSX.Element {
  const router = useRouter();

  if (!auth.currentUser) {
    router.push(LINKS.LOGIN);
  }

  return (
    <main className={styles.editor}>
      <Documentation />
      <div className={styles.editor__mainBlockWrapper}>
        <div className={styles.editor__leftSideWrapper}>
          <QueryEditor />
          <div className={styles.editor__additionalsWrapper}>
            <VariablesEditor />
            <HeadersEditor />
          </div>
        </div>
        <ResponseViewer />
      </div>
    </main>
  );
}

export default Editor;
