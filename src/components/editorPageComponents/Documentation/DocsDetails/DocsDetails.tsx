import { GQLField } from '@/types';
import styles from './docsDetails.module.scss';

function DocsDetails({ name, description, type }: GQLField): JSX.Element {
  return (
    <>
      <h2 className={styles.docsDetails__title}>{name}</h2>
      <p>{description}</p>
      <i>Type: {type.name}</i>
    </>
  );
}

export default DocsDetails;
