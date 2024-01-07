import styles from './queryEditor.module.scss';
import Code from '../Code';
import SideBar from '@/components/editorPageComponents/QueryEditor/SideBar/SideBar';
import { useContext, useEffect, useState } from 'react';
import { EndpointContext } from '@/pages/editor/Editor';
import prettify from '@/utils/prettify';
import EDITOR_MESSAGES from '@/consts/EDITOR_MESSAGES';

interface Props {
  GQLRequest: string;
  setGQLRequest: (GQLRequest: string) => void;
}

function QueryEditor({ GQLRequest, setGQLRequest }: Props): JSX.Element {
  const context = useContext(EndpointContext);
  const [code, setCode] = useState<string>('');

  useEffect(() => {
    setCode(prettify(EDITOR_MESSAGES.REQUEST_DEFAULT));
  }, [context.endpoint]);

  return (
    <section className={styles.queryEditor}>
      <Code value={code} setValue={setCode} />
      <SideBar
        code={code}
        setCode={setCode}
        GQLRequest={GQLRequest}
        setGQLRequest={setGQLRequest}
      />
    </section>
  );
}

export default QueryEditor;
