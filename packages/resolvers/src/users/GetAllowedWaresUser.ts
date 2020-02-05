import gql from "graphql-tag";

export const GQL_GET_ALLOWED_WARES_USER = gql`
  query getAllowedWaresUser($id: String!) {
    getUser(id: $id) {
      id
      name
      allowedWares {
        id
        name
      }
    }
  }
`;
