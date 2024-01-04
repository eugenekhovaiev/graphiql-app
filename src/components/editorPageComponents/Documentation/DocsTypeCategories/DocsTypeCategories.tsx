import React from 'react';
import styles from '@/components/editorPageComponents/Documentation/DocsInfo/docsInfo.module.scss';
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
      <h1>Docs</h1>
      <p>A GraphQL schema provides a root type for each kind of operation.</p>

      {allTypes && (
        <li
          className={styles.documentationInfo__link}
          onClick={() => editLists(allTypes)}
        >
          All Types
        </li>
      )}
      {rootFields && (
        <li
          className={styles.documentationInfo__link}
          onClick={() => editLists(rootFields)}
        >
          Root
        </li>
      )}
      {queryFields && (
        <li
          className={styles.documentationInfo__link}
          onClick={() => editLists(queryFields)}
        >
          Query
        </li>
      )}
    </>
  );
}

export default DocsTypeCategories;
