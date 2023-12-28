import { Field } from '@/components/editorPageComponents/Documentation/DocumentationInfo/DocumentationInfo';

function DocumentationDetails({ name, description, type }: Field): JSX.Element {
  console.log(type.name);
  return (
    <>
      <h2>{name}</h2>
      <p>{description}</p>
    </>
  );
}

export default DocumentationDetails;
