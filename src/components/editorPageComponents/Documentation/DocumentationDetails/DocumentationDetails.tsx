import { GQLSchemaField } from '@/types';

function DocumentationDetails({
  name,
  description,
  type,
}: GQLSchemaField): JSX.Element {
  console.log(type.name);
  return (
    <>
      <h2>{name}</h2>
      <p>{description}</p>
    </>
  );
}

export default DocumentationDetails;
