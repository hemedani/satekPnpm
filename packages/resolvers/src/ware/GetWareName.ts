import gql from "graphql-tag";

export const GQL_GET_WARE_NAME = gql`
  query getWareName($id: String!) {
    getWare(id: $id) {
      name
    }
  }
`;
