import gql from "graphql-tag";

export const GQL_DELETE_CATEGORY = gql`
  mutation deleteCategory($id: String!) {
    deleteCategory(id: $id) {
      id
      ok
    }
  }
`;
