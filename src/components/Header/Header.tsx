import styles from './Header.module.scss';
import ContainerLayout from '../ContainerLayout';

function Header(): JSX.Element {
  return (
    <div className={styles.header}>
      <ContainerLayout>Header</ContainerLayout>
    </div>
  );
}

export default Header;
