import styles from './endpointInput.module.scss';
import Button from '@/components/ui/Button';

function EndpointInput(): JSX.Element {
  return (
    <div className={styles.endpoint}>
      <input className={styles.endpoint__input} />
      <Button title="Change" type="button" styleType="light" />
    </div>
  );
}

export default EndpointInput;
