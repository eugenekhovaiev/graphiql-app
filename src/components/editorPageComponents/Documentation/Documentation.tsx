'use client';
import styles from './documentation.module.scss';
import Divider from '@/components/ui/Divider/';
import dynamic from 'next/dynamic';
import Preloader from '@/components/ui/Preloader';
import { Dispatch, SetStateAction } from 'react';

const DocsInfo = dynamic(() => import('./DocsInfo'), {
  ssr: false,
  loading: () => <Preloader />,
});

interface Props {
  isSideMenuOpen: boolean;
  setSideMenuOpen: Dispatch<SetStateAction<boolean>>;
}

function Documentation({
  isSideMenuOpen,
  setSideMenuOpen,
}: Props): JSX.Element {
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
