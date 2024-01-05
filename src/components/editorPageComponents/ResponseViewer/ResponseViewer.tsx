import Code from '../Code';
import styles from './responseViewer.module.scss';
import prettify from '@/utils/prettify';

function ResponseViewer(): JSX.Element {
  const respObj = {
    value: 'Response section',
  };
  const response = prettify(JSON.stringify(respObj));
  return (
    <section className={styles.responseViewer}>
      <Code value={response} readonly={true} />
    </section>
  );
}

export default ResponseViewer;
