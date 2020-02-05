import gql from "graphql-tag";

export const GQL_GET_STATE_CITIES = gql`
  query getStateCities($id: String!) {
    getState(id: $id) {
      id
      name
      cities {
        id
        name
      }
    }
  }
`;
