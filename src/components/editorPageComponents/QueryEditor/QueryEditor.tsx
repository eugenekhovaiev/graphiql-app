import styles from './queryEditor.module.scss';
import Code from '../Code';
import SideBar from '@/components/editorPageComponents/QueryEditor/SideBar/SideBar';

interface Props {
  code: string;
  setCode: (code: string) => void;
}

function QueryEditor({ code, setCode }: Props): JSX.Element {
  return (
    <section className={styles.queryEditor}>
      <Code value={code} setValue={setCode} />
      <SideBar code={code} setCode={setCode} />
    </section>
  );
}

export default QueryEditor;
