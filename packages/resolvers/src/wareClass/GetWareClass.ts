import gql from "graphql-tag";

export const GQL_GET_WARE_CLASS = gql`
  query getWareClass($id: String!) {
    getWareClass(id: $id) {
      id
      name
      enName
      # wareGroups {
      #   enName
      #   name
      #   id
      # }
      wareType {
        id
        name
      }
    }
  }
`;
