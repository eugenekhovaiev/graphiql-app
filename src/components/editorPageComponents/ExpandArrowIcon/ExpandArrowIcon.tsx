import Image from 'next/image';
import arrowUp from '../../../../public/arrow-up.svg';
import arrowDown from '../../../../public/arrow-down.svg';
import styles from './expandArrowIcon.module.scss';

interface Props {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

function ExpandArrowIcon({ isOpen, setOpen }: Props): JSX.Element {
  return (
    <Image
      className={styles.arrowIcon}
      src={isOpen ? arrowDown : arrowUp}
      // todo: replace with (prev) => !prev and fix types
      onClick={() => setOpen(!isOpen)}
      alt="expand arrow"
    />
  );
}

export default ExpandArrowIcon;
