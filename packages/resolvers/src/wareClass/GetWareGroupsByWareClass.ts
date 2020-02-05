import gql from "graphql-tag";

export const GQL_GET_WARE_CLASS_WARE_GROUPS = gql`
  query getWareClassWareGroups($id: String!) {
    getWareClass(id: $id) {
      id
      name
      wareGroups {
        name
        id
      }
    }
  }
`;
