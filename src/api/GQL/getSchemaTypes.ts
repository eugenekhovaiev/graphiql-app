import { GQLType } from '@/types';
import { INTROSPECTION_QUERY } from '@/api/GQL/GQLConfig';

export default async function getSchemaTypes(
  endpoint: string
): Promise<GQLType[] | void> {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: INTROSPECTION_QUERY }),
    });
    const data = await response.json();
    console.log(data);
    return data.data.__schema.types;
  } catch (error) {}
}
