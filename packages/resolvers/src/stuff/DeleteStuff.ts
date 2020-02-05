import gql from "graphql-tag";

export const GQL_DELETE_STUFF = gql`
  mutation deleteStuff($id: String!) {
    deleteStuff(id: $id) {
      id
    }
  }
`;
