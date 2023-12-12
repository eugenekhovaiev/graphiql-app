import Footer from '../Footer';
import Header from '../Header';
import { ReactNode } from 'react';

function RootLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default RootLayout;
