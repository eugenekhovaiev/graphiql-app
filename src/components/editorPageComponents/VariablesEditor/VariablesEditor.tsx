import styles from './variablesEditor.module.scss';
import Code from '@/components/editorPageComponents/Code';

function VariablesEditor(): JSX.Element {
  return (
    <section className={styles.variablesEditor}>
      <Code />
    </section>
  );
}

export default VariablesEditor;
