import gql from "graphql-tag";

export const GQL_DELETE_WARE_CLASS = gql`
  mutation deleteWareClass($id: String!) {
    deleteWareClass(id: $id) {
      id
    }
  }
`;
