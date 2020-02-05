import gql from "graphql-tag";

export const GQL_DELETE_CITY = gql`
  mutation deleteCity($id: String!) {
    deleteCity(id: $id) {
      id
      ok
    }
  }
`;
