import gql from "graphql-tag";

export const GQL_DELETE_STATE = gql`
  mutation deleteState($id: String!) {
    deleteState(id: $id) {
      id
      ok
    }
  }
`;
