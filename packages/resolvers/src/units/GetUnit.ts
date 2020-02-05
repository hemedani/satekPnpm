import gql from "graphql-tag";

export const GQL_GET_UNIT = gql`
  query getUnit($id: String!) {
    getUnit(id: $id) {
      id
      name
      address
      contact
      location
      state {
        id
        name
      }
      city {
        id
        name
      }
      university {
        id
        name
      }
      organization {
        id
        name
      }
      category {
        id
        name
        enName
      }
      logoUrl
    }
  }
`;
