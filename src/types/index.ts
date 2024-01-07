export interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface GQLType {
  name: string;
  fields?: GQLField[];
}

export interface GQLField {
  name: string;
  description: string | null;
  type: {
    name: string | null;
  };
}

export type DocsSchemaList = null | GQLType[] | GQLField[];
