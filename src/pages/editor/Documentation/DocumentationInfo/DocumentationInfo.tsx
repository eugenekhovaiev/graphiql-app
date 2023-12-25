import styles from './documentationInfo.module.scss';

interface Props {
  isOpen: boolean;
}

function DocumentationInfo({ isOpen }: Props): JSX.Element {
  return (
    <div
      className={`${styles.documentationInfo} ${
        isOpen && styles.documentationInfo_open
      }`}
    >
      Documentation
    </div>
  );
}

export default DocumentationInfo;
