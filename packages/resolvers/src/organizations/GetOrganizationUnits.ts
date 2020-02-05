import gql from "graphql-tag";

export const GQL_GET_ORGANIZATION_UNITS = gql`
  query getOrganizationUnits($id: String!) {
    getOrganization(id: $id) {
      id
      name
      address
      categories {
        units {
          id
          name
        }
      }
    }
  }
`;
