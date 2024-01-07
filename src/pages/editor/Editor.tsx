import styles from './editor.module.scss';
import ResponseViewer from 'src/components/editorPageComponents/ResponseViewer';
import QueryEditor from 'src/components/editorPageComponents/QueryEditor';
import EndpointInput from 'src/components/editorPageComponents/EndpointInput';
import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '@/api/firebase/firebaseConfig';
import LINKS from '@/consts/LINKS';
import Documentation from '@/components/editorPageComponents/Documentation';
import { onAuthStateChanged } from 'firebase/auth';
import fetchUserRequest from '@/api/GQL/fetchUserRequest';
import EDITOR_MESSAGES from '@/consts/EDITOR_MESSAGES';
import LOCAL_STORAGE_VALUES from '@/consts/LOCAL_STORAGE_VALUES';
import STATUS_CODES from '@/consts/STATUS_CODES';
import ExpandArrowIcon from '@/components/editorPageComponents/ExpandArrowIcon';
import VariablesEditor from '@/components/editorPageComponents/VariablesEditor';

export const EndpointContext = createContext({
  endpoint: '',
});

function Editor(): JSX.Element {
  let initialValue;
  if (typeof window !== 'undefined') {
    initialValue = localStorage.getItem(LOCAL_STORAGE_VALUES.ENDPOINT);
  }

  const [isSideMenuOpen, setSideMenuOpen] = useState<boolean>(false);
  const [isBottomSectionOpen, setBottomSectionOpen] = useState(false);
  const [endpoint, setEndpoint] = useState(initialValue || '');
  const [GQLRequest, setGQLRequest] = useState('');
  const [GQLResponse, setGQLResponse] = useState(
    EDITOR_MESSAGES.RESPONSE_DEFAULT
  );
  const [variables, setVariables] = useState('');
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push(LINKS.HOME);
      }
    });
  }, []);

  useEffect(() => {
    async function getGQLResponse(): Promise<void> {
      try {
        if (variables) {
          const variablesObject = JSON.parse(variables);
          const variablesArray = Object.keys(variablesObject);

          variablesArray.forEach((variable) => {
            const draw = GQLRequest.replaceAll(
              `$${variable}`,
              variablesObject[variable]
            );
            setGQLRequest(draw);
          });
        }
        const response = await fetchUserRequest(endpoint, GQLRequest);
        if (response === STATUS_CODES.FAIL) {
          setGQLResponse(EDITOR_MESSAGES.WRONG_URL);
        } else {
          setGQLResponse(JSON.stringify(response));
        }
      } catch (error) {}
    }

    if (GQLRequest.length > 0) {
      getGQLResponse();
    }
  }, [GQLRequest]);

  useEffect(() => {
    setGQLResponse(EDITOR_MESSAGES.RESPONSE_DEFAULT);
  }, [endpoint]);

  return (
    <main className={styles.editor}>
      <EndpointContext.Provider value={{ endpoint }}>
        <Documentation
          isSideMenuOpen={isSideMenuOpen}
          setSideMenuOpen={setSideMenuOpen}
        />
        <div className={styles.editor__mainBlockWithInput}>
          <EndpointInput
            endpoint={endpoint}
            setEndpoint={setEndpoint}
            setSideMenuOpen={setSideMenuOpen}
          />
          <div className={styles.editor__mainBlockWrapper}>
            <div className={styles.editor__leftBlockWrapper}>
              <QueryEditor
                GQLRequest={GQLRequest}
                setGQLRequest={setGQLRequest}
              />
              <div className={styles.editor__bottomBlockWrapper}>
                <div className={styles.editor__bottomBlockLinksWrapper}>
                  <p onClick={() => setBottomSectionOpen(true)}>Variables</p>
                  <p onClick={() => setBottomSectionOpen(true)}>Headers</p>
                </div>
                <ExpandArrowIcon
                  isOpen={isBottomSectionOpen}
                  setOpen={setBottomSectionOpen}
                />
              </div>
              {isBottomSectionOpen && (
                <VariablesEditor setVariables={setVariables} />
              )}
              {/*<HeadersEditor />*/}
            </div>
            <ResponseViewer GQLResponse={GQLResponse} />
          </div>
        </div>
      </EndpointContext.Provider>
    </main>
  );
}

export default Editor;
