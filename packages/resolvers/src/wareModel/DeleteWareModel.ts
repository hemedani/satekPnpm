import gql from "graphql-tag";

export const GQL_DELETE_WARE_MODEL = gql`
  mutation deleteWareModel($id: String!) {
    deleteWareModel(id: $id) {
      id
    }
  }
`;
