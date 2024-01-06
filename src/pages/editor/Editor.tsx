import styles from './editor.module.scss';
import ResponseViewer from 'src/components/editorPageComponents/ResponseViewer';
import QueryEditor from 'src/components/editorPageComponents/QueryEditor';
import VariablesEditor from 'src/components/editorPageComponents/VariablesEditor';
import HeadersEditor from 'src/components/editorPageComponents/HeadersEditor';
import arrowUp from '../../../public/arrow-up.svg';
import Image from 'next/image';
import EndpointInput from 'src/components/editorPageComponents/EndpointInput';
import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '@/api/firebase/firebaseConfig';
import LINKS from '@/consts/LINKS';
import Documentation from '@/components/editorPageComponents/Documentation';
import { onAuthStateChanged } from 'firebase/auth';

export const EndpointContext = createContext({
  endpoint: '',
});

function Editor(): JSX.Element {
  const [isSideMenuOpen, setSideMenuOpen] = useState<boolean>(false);
  const [endpoint, setEndpoint] = useState('');
  const [code, setCode] = useState('');
  const [GQLResponse, setGQLResponse] = useState('');
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push(LINKS.HOME);
      }
    });
  }, []);

  useEffect(() => {
    setGQLResponse('');
  }, [code]);

  return (
    <main className={styles.editor}>
      <EndpointContext.Provider value={{ endpoint }}>
        <Documentation
          isSideMenuOpen={isSideMenuOpen}
          setSideMenuOpen={setSideMenuOpen}
        />
      </EndpointContext.Provider>
      <div className={styles.editor__mainBlockWithInput}>
        <EndpointInput
          setEndpoint={setEndpoint}
          setSideMenuOpen={setSideMenuOpen}
        />
        <div className={styles.editor__mainBlockWrapper}>
          <div className={styles.editor__leftBlockWrapper}>
            <QueryEditor code={code} setCode={setCode} />
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
          <ResponseViewer GQLResponse={GQLResponse} />
        </div>
      </div>
    </main>
  );
}

export default Editor;
