import React from 'react';
import Image from 'next/image';
import arrow from '../../../../public/arrow-left.svg';
import styles from './arrowBack.module.scss';

interface Props {
  clickHandler: (isVisible: boolean) => void;
}

function ArrowBack({ clickHandler }: Props): JSX.Element {
  return (
    <div className={styles.arrowBack} onClick={() => clickHandler(false)}>
      <Image className={styles.arrowBack__arrow} src={arrow} alt="Arrow back" />
      <p>Back</p>
    </div>
  );
}

export default ArrowBack;
