import React from 'react';
import styles from './docsTypeCategories.module.scss';
import { GQLField, GQLType } from '@/types';

interface Props {
  allTypes: null | GQLType[];
  rootFields?: null | GQLField[];
  queryFields?: null | GQLField[];
  editLists: (types: GQLType[] | GQLField[]) => void;
}

function DocsTypeCategories({
  allTypes,
  rootFields,
  queryFields,
  editLists,
}: Props): JSX.Element {
  return (
    <>
      <h1 className={styles.typeCategories__title}>Docs</h1>
      <p>A GraphQL schema provides a root type for each kind of operation.</p>

      <ul className={styles.typeCategories__list}>
        {allTypes && (
          <li
            className={styles.typeCategories__link}
            onClick={() => editLists(allTypes)}
          >
            All Types
          </li>
        )}
        {rootFields && (
          <li
            className={styles.typeCategories__link}
            onClick={() => editLists(rootFields)}
          >
            Root
          </li>
        )}
        {queryFields && (
          <li
            className={styles.typeCategories__link}
            onClick={() => editLists(queryFields)}
          >
            Query
          </li>
        )}
      </ul>
    </>
  );
}

export default DocsTypeCategories;
