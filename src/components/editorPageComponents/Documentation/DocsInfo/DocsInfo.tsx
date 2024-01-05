'use client';
import styles from './docsInfo.module.scss';
import { useContext, useEffect, useState } from 'react';
import DocsList from '@/components/editorPageComponents/Documentation/DocsList/DocsList';
import ArrowBack from '@/components/ui/ArrowBack';
import { DocsSchemaList, GQLField, GQLType } from '@/types';
import getSchemaTypes from '@/api/GQL/getSchemaTypes';
import { EndpointContext } from '@/pages/editor/Editor';
import DocsDetails from '@/components/editorPageComponents/Documentation/DocsDetails/DocsDetails';
import LOCAL_STORAGE_VALUES from '@/consts/LOCAL_STORAGE_VALUES';
import DocsError from '@/components/editorPageComponents/Documentation/DocsError/DocsError';
import DocsTypeCategories from '@/components/editorPageComponents/Documentation/DocsTypeCategories/DocsTypeCategories';
import GQL_SCHEMA from '@/consts/GQL_SCHEMA';

interface Props {
  isOpen: boolean;
}

function DocsInfo({ isOpen = false }: Props): JSX.Element {
  const [allTypes, setAllTypes] = useState<null | GQLType[]>();
  const [rootFields, setRootFields] = useState<null | GQLField[]>(null);
  const [queryFields, setQueryFields] = useState<null | GQLField[]>(null);
  const [currentItem, setCurrentItem] = useState<null | GQLField>(null);
  const [currentList, setCurrentList] = useState<DocsSchemaList>(null);
  const [prevList, setPrevList] = useState<DocsSchemaList>(null);
  const [schemaError, setSchemaError] = useState<boolean>(false);
  const { endpoint } = useContext(EndpointContext);
  let storageEndpoint;
  if (typeof window !== 'undefined') {
    storageEndpoint = localStorage.getItem(LOCAL_STORAGE_VALUES.ENDPOINT);
  }
  const fetchEndpoint = endpoint || storageEndpoint;

  function setCurrentAndPrevLists(types: GQLType[] | GQLField[]): void {
    currentList && setPrevList(currentList);
    setCurrentList(types);
  }

  useEffect(() => {
    currentList === prevList && setPrevList(null);
  }, [currentList]);

  useEffect(() => {
    async function setGQLData(): Promise<void> {
      setAllTypes(null);
      setRootFields(null);
      setQueryFields(null);

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
            if (type.fields && type.name.toLowerCase().includes('query')) {
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
        <DocsError
          title={GQL_SCHEMA.WRONG_URL_TITLE}
          message={GQL_SCHEMA.WRONG_URL_MESSAGE}
        />
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
        <DocsTypeCategories
          allTypes={allTypes as GQLType[]}
          rootFields={rootFields}
          queryFields={queryFields}
          editLists={setCurrentAndPrevLists}
        />
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
        <DocsDetails
          name={currentItem.name}
          description={currentItem.description}
          type={currentItem.type}
        />
      )}
    </div>
  );
}

export default DocsInfo;
