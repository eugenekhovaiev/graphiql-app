import Image from 'next/image';
import arrowUp from '../../../../public/arrow-up.svg';
import arrowDown from '../../../../public/arrow-down.svg';
import styles from './expandArrowIcon.module.scss';

interface Props {
  isOpen: boolean;
  setOpen: (isOpen: boolean | ((prev: boolean) => boolean)) => void;
}

function ExpandArrowIcon({ isOpen, setOpen }: Props): JSX.Element {
  return (
    <Image
      className={styles.arrowIcon}
      src={isOpen ? arrowDown : arrowUp}
      onClick={() => setOpen((prev) => !prev)}
      alt="expand arrow"
    />
  );
}

export default ExpandArrowIcon;
