import React from 'react';
import styles from './docsList.module.scss';
import { GQLField, GQLType } from '@/types';

interface Props {
  list: null | GQLType[] | GQLField[];
  currentList: null | GQLType[] | GQLField[];
  setCurrentItem: (currentItem: GQLField) => void;
  setCurrentList: (currentList: null | GQLType[] | GQLField[]) => void;
  setPrevList: (currentList: null | GQLType[] | GQLField[]) => void;
}

function DocsList({
  list,
  setCurrentItem,
  setCurrentList,
  currentList,
  setPrevList,
}: Props): JSX.Element {
  return (
    <ul className={styles.docsList}>
      {list?.map((item) => {
        if ('description' in item) {
          return (
            <li
              className={styles.docsList__item}
              key={item.name}
              onClick={() => setCurrentItem(item)}
            >
              {item.name}
            </li>
          );
        }
        return (
          <li
            className={styles.docsList__item}
            key={item.name}
            onClick={() => {
              currentList && setPrevList(currentList);
              setCurrentList(item.fields!);
            }}
          >
            {item.name}
          </li>
        );
      })}
    </ul>
  );
}

export default DocsList;
