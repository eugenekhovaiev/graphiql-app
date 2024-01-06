import React from 'react';
import Image from 'next/image';
import arrow from '../../../../public/arrow-left.svg';
import styles from './arrowBack.module.scss';
import { DocsSchemaList, GQLField } from '@/types';

interface Props {
  setCurrentList: (currentList: DocsSchemaList) => void;
  setCurrentItem: (currentItem: null | GQLField) => void;
  currentItem: null | GQLField;
  prevList: DocsSchemaList;
}

function ArrowBack({
  setCurrentList,
  setCurrentItem,
  currentItem,
  prevList,
}: Props): JSX.Element {
  return (
    <div
      className={styles.arrowBack}
      onClick={() => {
        currentItem
          ? setCurrentItem(null)
          : setCurrentList(prevList ? prevList : null);
      }}
    >
      <Image className={styles.arrowBack__arrow} src={arrow} alt="Arrow back" />
      <p>Back</p>
    </div>
  );
}

export default ArrowBack;
