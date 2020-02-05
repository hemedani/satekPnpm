import gql from "graphql-tag";

export const GQL_GET_ORGANIZATION = gql`
  query getOrganizationSimple($id: String!) {
    getOrganization(id: $id) {
      id
      name
      logoUrl
      city {
        id
        name
      }
      state {
        id
        name
      }
      university {
        id
        name
      }
      contact
      location
      address
    }
  }
`;
