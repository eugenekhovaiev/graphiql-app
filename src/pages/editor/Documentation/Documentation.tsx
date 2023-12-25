import styles from './documentation.module.scss';
import { useState } from 'react';
import DocumentationInfo from '@/pages/editor/Documentation/DocumentationInfo';
import Divider from '@/components/ui/Divider';

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
      <DocumentationInfo isOpen={isSideMenuOpen} />
    </aside>
  );
}

export default Documentation;
