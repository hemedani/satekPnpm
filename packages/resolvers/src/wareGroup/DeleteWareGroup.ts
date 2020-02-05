import gql from "graphql-tag";

export const GQL_DELETE_WARE_GROUP = gql`
  mutation deleteWareGroup($id: String!) {
    deleteWareGroup(id: $id) {
      id
    }
  }
`;
