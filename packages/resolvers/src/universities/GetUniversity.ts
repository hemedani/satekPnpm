import gql from "graphql-tag";

export const GQL_GET_UNIVERSITY = gql`
  query getUniversity($id: String!) {
    getUniversity(id: $id) {
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
    }
  }
`;
