import { GQLType } from '@/types';
import STATUS_CODES from '@/consts/STATUS_CODES';

export default async function fetchUserRequest(
  endpoint: string,
  query: string
): Promise<GQLType[] | string> {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });
    return await response.json();
  } catch (error) {
    return STATUS_CODES.FAIL;
  }
}
