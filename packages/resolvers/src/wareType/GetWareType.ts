import gql from "graphql-tag";

export const GQL_GET_WARE_TYPE = gql`
  query getWareType($id: String!) {
    getWareType(id: $id) {
      id
      name
      enName
    }
  }
`;
