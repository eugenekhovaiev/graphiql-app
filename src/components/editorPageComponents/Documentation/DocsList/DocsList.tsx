import React from 'react';
import styles from './docsList.module.scss';
import { GQLSchemaField } from '@/types';

interface Props {
  list: null | GQLSchemaField[];
  setCurrentItem: (currentItem: GQLSchemaField) => void;
}

function DocsList({ list, setCurrentItem }: Props): JSX.Element {
  return (
    <ul className={styles.docsList}>
      {list?.map((item) => (
        <li
          className={styles.docsList__item}
          key={item.name}
          onClick={() => setCurrentItem(item)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
}

export default DocsList;
