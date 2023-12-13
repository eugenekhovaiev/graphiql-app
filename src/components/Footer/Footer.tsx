import styles from './footer.module.scss';
import ContainerLayout from '../ContainerLayout';

function Footer(): JSX.Element {
  return (
    <div className={styles.footer}>
      <ContainerLayout>Footer</ContainerLayout>
    </div>
  );
}

export default Footer;
