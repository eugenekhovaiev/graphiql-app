import { GQLField } from '@/types';

function DocsDetails({ name, description, type }: GQLField): JSX.Element {
  return (
    <>
      <h2>{name}</h2>
      <p>{description}</p>
      <i>Type: {type.name}</i>
    </>
  );
}

export default DocsDetails;
