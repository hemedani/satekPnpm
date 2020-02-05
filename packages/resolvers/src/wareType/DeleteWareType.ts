import gql from "graphql-tag";

export const GQL_DELETE_WARE_TYPE = gql`
  mutation deleteWareType($id: String!) {
    deleteWareType(id: $id) {
      id
    }
  }
`;
