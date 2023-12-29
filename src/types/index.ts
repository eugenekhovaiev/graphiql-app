export interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface GQLSchemaType {
  name: string;
  fields?: GQLSchemaField[];
}

export interface GQLSchemaField {
  name: string;
  description: string | null;
  type: {
    name: string | null;
  };
}
