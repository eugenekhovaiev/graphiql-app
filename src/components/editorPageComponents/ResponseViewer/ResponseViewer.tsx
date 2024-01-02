import Code from '../Code';
import styles from './responseViewer.module.scss';

function ResponseViewer(): JSX.Element {
  const response = `{\n  value: Response section\n}`;
  return (
    <section className={styles.responseViewer}>
      <Code value={response} readonly={true} />
    </section>
  );
}

export default ResponseViewer;
