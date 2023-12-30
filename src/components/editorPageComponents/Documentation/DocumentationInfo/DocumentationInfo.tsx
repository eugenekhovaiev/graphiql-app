'use client';
import styles from './documentationInfo.module.scss';
import { useContext, useEffect, useState } from 'react';
import DocumentationDetails from '@/components/editorPageComponents/Documentation/DocumentationDetails/DocumentationDetails';
import DocsList from '@/components/editorPageComponents/Documentation/DocsList/DocsList';
import ArrowBack from '@/components/ui/ArrowBack';
import { GQLSchemaField, GQLSchemaType } from '@/types';
import getSchemaTypes from '@/api/GQL/getSchemaTypes';
import { EndpointContext } from '@/pages/editor/Editor';

interface Props {
  isOpen: boolean;
}

function DocumentationInfo({ isOpen = false }: Props): JSX.Element {
  const [GQLSchema, setGQLSchema] = useState<null | GQLSchemaType[]>();
  const [rootList, setRootList] = useState<undefined | GQLSchemaField[]>(
    undefined
  );
  const [currentItem, setCurrentItem] = useState<null | GQLSchemaField>(null);
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
        setGQLSchema(schemaTypes);
        schemaTypes.forEach((type: GQLSchemaType) => {
          if (type.name === 'Root' || type.name === 'Query') {
            setRootList(type.fields);
          }
        });
      }
    }

    setGQLData();
  }, [endpoint]);

  console.log(GQLSchema);

  return (
    <div
      className={`${styles.documentationInfo} ${
        isOpen && styles.documentationInfo_open
      }`}
    >
      {isListVisible && <ArrowBack clickHandler={setListVisible} />}
      {rootList && !currentItem && (
        <>
          <h1>Docs</h1>
          <p>
            A GraphQL schema provides a root type for each kind of operation.
          </p>
          <i onClick={() => setListVisible((prev) => !prev)}>Root Types</i>
          {isListVisible && (
            <DocsList list={rootList} setCurrentItem={setCurrentItem} />
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
