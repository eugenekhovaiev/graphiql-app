export const INTROSPECTION_QUERY = `
  query IntrospectionQuery {
    __schema {
      types {
        name
        fields {
          name
          description
          type {
            name
          }
        }
      }
    }
  }
`;
