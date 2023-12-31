import React from 'react';
import styles from './docsList.module.scss';
import { GQLField } from '@/types';

interface Props {
  list: null | GQLField[];
  setCurrentItem: (currentItem: GQLField) => void;
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
