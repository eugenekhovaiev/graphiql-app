import styles from './queryEditor.module.scss';
import Code from '../Code';
import SideBar from '@/components/editorPageComponents/QueryEditor/SideBar/SideBar';
import { useState } from 'react';

interface Props {
  GQLRequest: string;
  setGQLRequest: (GQLRequest: string) => void;
}

function QueryEditor({ GQLRequest, setGQLRequest }: Props): JSX.Element {
  const [code, setCode] = useState<string>('');

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
