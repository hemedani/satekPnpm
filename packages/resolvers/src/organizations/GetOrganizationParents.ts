import gql from "graphql-tag";

export const GQL_GET_ORGANIZATION_PARENTS = gql`
  query getOrganizationParents($id: String!) {
    getOrganization(id: $id) {
      id
      state {
        name
        id
      }
      city {
        id
        name
      }
      university {
        name
        id
      }
    }
  }
`;
