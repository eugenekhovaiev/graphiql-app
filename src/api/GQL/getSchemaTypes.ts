import { GQLSchemaType } from '@/types';
import { GQL_ENDPOINT, INTROSPECTION_QUERY } from '@/api/GQL/GQLConfig';

export default async function getSchemaTypes(): Promise<GQLSchemaType[]> {
  const response = await fetch(GQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: INTROSPECTION_QUERY }),
  });
  const data = await response.json();
  return data.data.__schema.types;
}
