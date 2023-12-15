import Footer from '../Footer';
import Header from '../Header';
import { ReactNode } from 'react';
import styles from './root-layout.module.scss';

function RootLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <div className={styles.rootLayout}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default RootLayout;
