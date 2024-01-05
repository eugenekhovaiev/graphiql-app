'use client';
import styles from './documentation.module.scss';
import { useState } from 'react';
import Divider from '@/components/ui/Divider/';
import dynamic from 'next/dynamic';
import Preloader from '@/components/ui/Preloader';

const DocsInfo = dynamic(() => import('./DocsInfo'), {
  ssr: false,
  loading: () => <Preloader />,
});

function Documentation(): JSX.Element {
  const [isSideMenuOpen, setSideMenuOpen] = useState<boolean>(false);
  return (
    <aside
      className={`${styles.documentation} ${
        isSideMenuOpen && styles.documentation_withInfo
      }`}
    >
      <button
        className={`${styles.documentation__button} ${
          isSideMenuOpen && styles.documentation__button_active
        }`}
        onClick={() => setSideMenuOpen((prev) => !prev)}
      >
        <div
          className={`${styles.documentation__icon} ${
            isSideMenuOpen && styles.documentation__icon_active
          }`}
        />
      </button>
      {isSideMenuOpen && <Divider />}
      {isSideMenuOpen && <DocsInfo isOpen={isSideMenuOpen} />}
    </aside>
  );
}

export default Documentation;
