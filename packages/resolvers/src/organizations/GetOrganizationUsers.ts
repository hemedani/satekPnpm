import gql from "graphql-tag";

export const GQL_GET_ORGANIZATION_USERS = gql`
  query getOrganization($id: String!) {
    getOrganization(id: $id) {
      id
      name
      userToSites {
        user {
          firstName
          lastName
          id
        }
      }
    }
  }
`;
