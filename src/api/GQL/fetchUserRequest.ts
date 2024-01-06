import { GQLType } from '@/types';

export default async function fetchUserRequest(
  endpoint: string,
  query: string
): Promise<GQLType[] | Error> {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return new Error(String(error));
  }
}
