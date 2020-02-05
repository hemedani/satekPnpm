import gql from "graphql-tag";

export const GQL_UPDATE_WARE_CLASS = gql`
  mutation updateWareClass(
    $name: String!
    $enName: String!
    $wareTypeId: String!
    $id: String!
  ) {
    updateWareClass(
      data: { name: $name, enName: $enName, wareTypeId: $wareTypeId }
      id: $id
    ) {
      id
      name
      enName
    }
  }
`;
