import gql from "graphql-tag";

export const GQL_GET_ORGANIZATION_CATEGORIES = gql`
  query getOrganizationCategories($id: String!) {
    getOrganization(id: $id) {
      id
      name
      address
      categories {
        id
        name
      }
    }
  }
`;
