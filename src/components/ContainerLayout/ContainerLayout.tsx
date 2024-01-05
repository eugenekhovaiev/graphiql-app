import styles from './container.module.scss';
import { ReactNode } from 'react';

interface ContainerProps {
  className?: string;
  children: ReactNode;
}

function ContainerLayout(props: ContainerProps): JSX.Element {
  return (
    <div className={`${styles.container} ${props.className || ''}`}>
      {props.children}
    </div>
  );
}

export default ContainerLayout;
