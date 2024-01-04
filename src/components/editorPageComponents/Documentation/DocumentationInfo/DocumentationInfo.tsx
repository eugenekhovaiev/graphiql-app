'use client';
import styles from './documentationInfo.module.scss';
import { useContext, useEffect, useState } from 'react';
import DocsList from '@/components/editorPageComponents/Documentation/DocsList/DocsList';
import ArrowBack from '@/components/ui/ArrowBack';
import { GQLField, GQLType } from '@/types';
import getSchemaTypes from '@/api/GQL/getSchemaTypes';
import { EndpointContext } from '@/pages/editor/Editor';
import DocumentationDetails from '@/components/editorPageComponents/Documentation/DocumentationDetails/DocumentationDetails';
import GQL_SCHEMA from '@/consts/GQL_SCHEMA';

interface Props {
  isOpen: boolean;
}

function DocumentationInfo({ isOpen = false }: Props): JSX.Element {
  const [allTypes, setAllTypes] = useState<null | GQLType[]>();
  const [rootFields, setRootFields] = useState<null | GQLField[]>(null);
  const [queryFields, setQueryFields] = useState<null | GQLField[]>(null);
  const [currentItem, setCurrentItem] = useState<null | GQLField>(null);
  const [currentList, setCurrentList] = useState<null | GQLType[] | GQLField[]>(
    null
  );
  const [prevList, setPrevList] = useState<null | GQLType[] | GQLField[]>(null);
  const [schemaError, setSchemaError] = useState<boolean>(false);
  const { endpoint } = useContext(EndpointContext);
  let storageEndpoint;
  if (typeof window !== 'undefined') {
    storageEndpoint = localStorage.getItem('endpoint');
  }
  const fetchEndpoint = endpoint || storageEndpoint;

  function editLists(types: GQLType[] | GQLField[]): void {
    currentList && setPrevList(currentList);
    setCurrentList(types);
  }

  useEffect(() => {
    currentList === prevList && setPrevList(null);
  }, [currentList]);

  useEffect(() => {
    async function setGQLData(): Promise<void> {
      if (fetchEndpoint) {
        const schemaTypes = await getSchemaTypes(fetchEndpoint);
        if (schemaTypes) {
          setSchemaError(false);
          setAllTypes(
            schemaTypes.filter((type) => /^(?!__).*$/.test(type.name))
          );

          schemaTypes.forEach((type: GQLType) => {
            if (type.fields && type.name === 'Root') {
              setRootFields(type.fields);
            }
            if (type.fields && type.name === 'Query') {
              setQueryFields(type.fields);
            }
          });
        } else {
          setSchemaError(true);
        }
      }
    }

    setGQLData();
  }, [endpoint]);

  return (
    <div
      className={`${styles.documentationInfo} ${
        isOpen && styles.documentationInfo_open
      }`}
    >
      {schemaError && (
        <>
          <h2>{GQL_SCHEMA.WRONG_URL_TITLE}</h2>
          <p className={styles.documentationInfo__errorMessage}>
            {GQL_SCHEMA.WRONG_URL_MESSAGE}
          </p>
        </>
      )}
      {(currentList || currentItem) && (
        <ArrowBack
          currentItem={currentItem}
          prevList={prevList}
          setCurrentList={setCurrentList}
          setCurrentItem={setCurrentItem}
        />
      )}

      {!schemaError && !currentList && !currentItem && (
        <>
          <h1>Docs</h1>
          <p>
            A GraphQL schema provides a root type for each kind of operation.
          </p>

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
      )}

      {currentList && !currentItem && (
        <DocsList
          list={currentList}
          currentList={currentList}
          setCurrentItem={setCurrentItem}
          setCurrentList={setCurrentList}
          setPrevList={setPrevList}
        />
      )}

      {currentItem && (
        <DocumentationDetails
          name={currentItem.name}
          description={currentItem.description}
          type={currentItem.type}
        />
      )}
    </div>
  );
}

export default DocumentationInfo;
