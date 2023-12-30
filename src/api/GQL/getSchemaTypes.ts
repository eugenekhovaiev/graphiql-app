import { GQLSchemaType } from '@/types';
import { INTROSPECTION_QUERY } from '@/api/GQL/GQLConfig';

export default async function getSchemaTypes(
  endpoint: string
): Promise<GQLSchemaType[]> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: INTROSPECTION_QUERY }),
  });
  const data = await response.json();
  return data.data.__schema.types;
}
