'use client';
import styles from './documentationInfo.module.scss';
import { useEffect, useState } from 'react';
import DocumentationDetails from '@/components/editorPageComponents/Documentation/DocumentationDetails/DocumentationDetails';

interface Props {
  isOpen: boolean;
}

export interface Field {
  name: string;
  description: string | null;
  type: {
    name: string | null;
  };
}

interface SchemaType {
  name: string;
  fields?: Field[];
}

function DocumentationInfo({ isOpen = false }: Props): JSX.Element {
  const [schemaTypes, setSchemaTypes] = useState<null | SchemaType[]>();
  const [rootList, setRootList] = useState<null | Field[]>();
  const [currentField, setCurrentField] = useState<null | Field>(null);
  const endpoint = 'https://swapi-graphql.netlify.app/.netlify/functions/index';
  const INTROSPECTION_QUERY = `
  query IntrospectionQuery {
    __schema {
      types {
        name
        fields {
          name
          description
          type {
            name
          }
        }
      }
    }
  }
`;

  useEffect(() => {
    async function fetchData(): Promise<void> {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: INTROSPECTION_QUERY }),
      });
      const data = await response.json();
      const schemaTypes: SchemaType[] = data.data.__schema.types;
      setSchemaTypes(schemaTypes);

      schemaTypes.forEach((type: SchemaType) => {
        if (type.name === 'Root' || type.name === 'Query') {
          setRootList(type.fields);
        }
      });
    }

    fetchData();
  }, []);

  console.log(schemaTypes);

  return (
    <div
      className={`${styles.documentationInfo} ${
        isOpen && styles.documentationInfo_open
      }`}
    >
      {rootList && !currentField && (
        <>
          <h1>Docs</h1>
          <p>
            A GraphQL schema provides a root type for each kind of operation.
          </p>
          <ul>
            {rootList.map((field) => (
              <li
                className={styles.documentationInfo__link}
                key={field.name}
                onClick={() => setCurrentField(field)}
              >
                {field.name}
              </li>
            ))}
          </ul>
        </>
      )}
      {currentField && (
        <DocumentationDetails
          name={currentField.name}
          description={currentField.description}
          type={currentField.type}
        />
      )}
    </div>
  );
}

export default DocumentationInfo;
