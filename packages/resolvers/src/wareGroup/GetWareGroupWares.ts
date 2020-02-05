import gql from "graphql-tag";

export const GQL_GET_WARE_GROUP_WARES = gql`
  query getWareGroupWares($id: String!) {
    getWareGroup(id: $id) {
      wares {
        name
        id
      }
    }
  }
`;
