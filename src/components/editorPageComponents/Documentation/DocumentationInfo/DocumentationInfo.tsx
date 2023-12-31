'use client';
import styles from './documentationInfo.module.scss';
import { useContext, useEffect, useState } from 'react';
import DocumentationDetails from '@/components/editorPageComponents/Documentation/DocumentationDetails/DocumentationDetails';
import DocsList from '@/components/editorPageComponents/Documentation/DocsList/DocsList';
import ArrowBack from '@/components/ui/ArrowBack';
import { GQLField, GQLType } from '@/types';
import getSchemaTypes from '@/api/GQL/getSchemaTypes';
import { EndpointContext } from '@/pages/editor/Editor';

interface Props {
  isOpen: boolean;
}

function DocumentationInfo({ isOpen = false }: Props): JSX.Element {
  const [allTypes, setAllTypes] = useState<null | GQLType[]>();
  const [rootFields, setRootFields] = useState<null | GQLField[]>(null);
  const [queryFields, setQueryFields] = useState<null | GQLField[]>(null);

  const [currentItem, setCurrentItem] = useState<null | GQLField>(null);
  const [isListVisible, setListVisible] = useState<boolean>(false);

  const { endpoint } = useContext(EndpointContext);
  let storageEndpoint;
  if (typeof window !== 'undefined') {
    storageEndpoint = localStorage.getItem('endpoint');
  }
  const fetchEndpoint = endpoint || storageEndpoint;

  useEffect(() => {
    async function setGQLData(): Promise<void> {
      if (fetchEndpoint) {
        const schemaTypes = await getSchemaTypes(fetchEndpoint);
        setAllTypes(schemaTypes);

        schemaTypes.forEach((type: GQLType) => {
          if (type.fields && type.name === 'Root') {
            setRootFields(type.fields);
          }
          if (type.fields && type.name === 'Query') {
            setQueryFields(type.fields);
          }
        });
      }
    }

    setGQLData();
  }, [endpoint]);

  console.log(allTypes);

  return (
    <div
      className={`${styles.documentationInfo} ${
        isOpen && styles.documentationInfo_open
      }`}
    >
      <ArrowBack clickHandler={setListVisible} />

      {allTypes && (
        <i onClick={() => setListVisible((prev) => !prev)}>All Types</i>
      )}
      {rootFields && (
        <i onClick={() => setListVisible((prev) => !prev)}>Root Fields</i>
      )}
      {queryFields && (
        <i onClick={() => setListVisible((prev) => !prev)}>Query Fields</i>
      )}

      {rootFields && !currentItem && (
        <>
          <h1>Docs</h1>
          <p>
            A GraphQL schema provides a root type for each kind of operation.
          </p>
          <i onClick={() => setListVisible((prev) => !prev)}>All Types</i>
          {isListVisible && (
            <DocsList list={rootFields} setCurrentItem={setCurrentItem} />
          )}
        </>
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
