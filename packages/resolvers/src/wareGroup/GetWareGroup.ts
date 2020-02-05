import gql from "graphql-tag";

export const GQL_GET_WARE_GROUP = gql`
  query getWareGroup($id: String!) {
    getWareGroup(id: $id) {
      id
      name
      enName
      wares {
        name
        enName
        id
      }
      wareType {
        id
        name
      }
      wareClasses {
        name
        id
      }
    }
  }
`;
