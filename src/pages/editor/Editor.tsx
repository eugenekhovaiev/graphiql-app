import styles from './editor.module.scss';
import ResponseViewer from 'src/components/editorPageComponents/ResponseViewer';
import QueryEditor from 'src/components/editorPageComponents/QueryEditor';
import VariablesEditor from 'src/components/editorPageComponents/VariablesEditor';
import HeadersEditor from 'src/components/editorPageComponents/HeadersEditor';
import Documentation from 'src/components/editorPageComponents/Documentation';
import arrowUp from '../../../public/arrow-up.svg';
import Image from 'next/image';
import EndpointInput from 'src/components/editorPageComponents/EndpointInput';
import { createContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/api/firebase/firebaseConfig';
import LINKS from '@/consts/LINKS';

export const EndpointContext = createContext({
  endpoint: '',
});

function Editor(): JSX.Element {
  const [endpoint, setEndpoint] = useState('');
  const router = useRouter();

  if (!auth.currentUser) {
    router.push(LINKS.LOGIN);
  }

  return (
    <main className={styles.editor}>
      <EndpointContext.Provider value={{ endpoint }}>
        <Documentation />
      </EndpointContext.Provider>
      <div className={styles.editor__mainBlockWithInput}>
        <EndpointInput setEndpoint={setEndpoint} />
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
