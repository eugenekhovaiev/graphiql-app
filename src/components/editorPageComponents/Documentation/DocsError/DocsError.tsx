import styles from './docsError.module.scss';

interface Props {
  title: string;
  message: string;
}

function DocsError({ title, message }: Props): JSX.Element {
  return (
    <>
      <h2 className={styles.docsError__title}>{title}</h2>
      <p className={styles.documentationInfo__errorMessage}>{message}</p>
    </>
  );
}

export default DocsError;
