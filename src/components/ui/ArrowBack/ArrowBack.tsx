import React from 'react';
import TEXT_CONTENT_LOCALIZATION from './TEXT_CONTENT_LOCALIZATION.json';
import Image from 'next/image';
import arrow from '../../../../public/arrow-left.svg';
import styles from './arrowBack.module.scss';
import { DocsSchemaList, GQLField } from '@/types';
import { useLanguageContext } from '@/utils/contexts/LangContext';

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
  const { language } = useLanguageContext();
  const textContent = TEXT_CONTENT_LOCALIZATION[language];

  return (
    <div
      className={styles.arrowBack}
      onClick={() => {
        currentItem
          ? setCurrentItem(null)
          : setCurrentList(prevList ? prevList : null);
      }}
    >
      <Image
        className={styles.arrowBack__arrow}
        src={arrow}
        alt={textContent.iconAlt}
      />
      <p>{textContent.button}</p>
    </div>
  );
}

export default ArrowBack;
