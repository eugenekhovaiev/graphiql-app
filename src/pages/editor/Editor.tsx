import styles from './editor.module.scss';
import ResponseViewer from 'src/components/editorPageComponents/ResponseViewer';
import QueryEditor from 'src/components/editorPageComponents/QueryEditor';
import VariablesEditor from 'src/components/editorPageComponents/VariablesEditor';
import HeadersEditor from 'src/components/editorPageComponents/HeadersEditor';
import Documentation from 'src/components/editorPageComponents/Documentation';
import arrowUp from '../../../public/arrow-up.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LINKS from '@/consts/LINKS';
import { auth } from '@/api/firebaseConfig';
import EndpointInput from 'src/components/editorPageComponents/EndpointInput';
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

  return (
    <main className={styles.editor}>
      <Documentation />
      <div className={styles.editor__mainBlockWithInput}>
        <EndpointInput />
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
      </div>
    </main>
  );
}

export default Editor;
