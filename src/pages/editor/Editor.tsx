import styles from './editor.module.scss';
import ResponseViewer from 'src/pages/editor/ResponseViewer';
import QueryEditor from '@/pages/editor/QueryEditor';
import VariablesEditor from 'src/pages/editor/VariablesEditor';
import HeadersEditor from '@/pages/editor/HeadersEditor';
import Documentation from '@/pages/editor/Documentation';
import arrowUp from '../../../public/arrow-up.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LINKS from '@/consts/LINKS';
import { auth } from '@/api/firebaseConfig';

function Editor(): JSX.Element {
  const router = useRouter();

  if (!auth.currentUser) {
    router.push(LINKS.LOGIN);
  }

  return (
    <main className={styles.editor}>
      <Documentation />
      <div className={styles.editor__mainBlockWrapper}>
        <div className={styles.editor__leftBlockWrapper}>
          <QueryEditor />
          <div className={styles.editor__bottomBlockWrapper}>
            <div className={styles.editor__bottomBlockLinksWrapper}>
              <VariablesEditor />
              <HeadersEditor />
            </div>
            <Image
              className={styles.editor__arrow}
              src={arrowUp}
              alt="expand arrow"
            />
          </div>
        </div>
        <ResponseViewer />
      </div>
    </main>
  );
}

export default Editor;
