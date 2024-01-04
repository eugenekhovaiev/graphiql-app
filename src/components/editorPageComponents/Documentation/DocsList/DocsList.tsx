import React from 'react';
import styles from './docsList.module.scss';
import { GQLField, GQLType } from '@/types';
import DocsError from '@/components/editorPageComponents/Documentation/DocsError';
import GQL_SCHEMA from '@/consts/GQL_SCHEMA';

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
      {list?.length === 0 ? (
        <DocsError
          title={GQL_SCHEMA.NO_FIELDS_TITLE}
          message={GQL_SCHEMA.NO_FIELDS_MESSAGE}
        />
      ) : (
        list?.map((item) => {
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
                setCurrentList(item.fields ? item.fields : []);
              }}
            >
              {item.name}
            </li>
          );
        })
      )}
    </ul>
  );
}

export default DocsList;
