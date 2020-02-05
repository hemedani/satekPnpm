import gql from "graphql-tag";

export const GQL_GET_WARE_MODEL = gql`
  query getWareModel($id: String!) {
    getWareModel(id: $id) {
      id
      name
      enName
      wareClass {
        id
        name
      }
      wareType {
        id
        name
      }
      wareGroup {
        id
        name
      }
    }
  }
`;
