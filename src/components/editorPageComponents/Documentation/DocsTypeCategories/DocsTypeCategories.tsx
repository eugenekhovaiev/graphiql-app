import React from 'react';
import styles from './docsTypeCategories.module.scss';
import TEXT_CONTENT_LOCALIZATION from './TEXT_CONTENT_LOCALIZATION.json';
import { GQLField, GQLType } from '@/types';
import { useLanguageContext } from '@/utils/contexts/LangContext';

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
  const { language } = useLanguageContext();
  const textContent = TEXT_CONTENT_LOCALIZATION[language];

  return (
    <>
      <h1 className={styles.typeCategories__title}>{textContent.title}</h1>
      <p>{textContent.description}</p>

      <ul className={styles.typeCategories__list}>
        {allTypes && (
          <li
            className={styles.typeCategories__link}
            onClick={() => editLists(allTypes)}
          >
            All Schema Types
          </li>
        )}
        {rootFields && (
          <li
            className={styles.typeCategories__link}
            onClick={() => editLists(rootFields)}
          >
            Root Types
          </li>
        )}
        {queryFields && (
          <li
            className={styles.typeCategories__link}
            onClick={() => editLists(queryFields)}
          >
            Query Types
          </li>
        )}
      </ul>
    </>
  );
}

export default DocsTypeCategories;
