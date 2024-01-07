import styles from './variablesEditor.module.scss';
import Code from '@/components/editorPageComponents/Code';

interface Props {
  setVariables: (variables: string) => void;
}

function VariablesEditor({ setVariables }: Props): JSX.Element {
  return (
    <section className={styles.variablesEditor}>
      <Code setValue={setVariables} />
    </section>
  );
}

export default VariablesEditor;
