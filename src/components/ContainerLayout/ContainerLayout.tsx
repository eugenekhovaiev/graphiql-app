import styles from './container.module.scss';
import { ReactNode } from 'react';

function ContainerLayout({ children }: { children: ReactNode }): JSX.Element {
  return <div className={styles.container}>{children}</div>;
}

export default ContainerLayout;
