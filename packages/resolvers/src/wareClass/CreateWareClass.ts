import gql from "graphql-tag";

export const GQL_CREATE_WARE_CLASS = gql`
  mutation createWareClass(
    $name: String!
    $enName: String!
    $wareTypeId: String!
  ) {
    createWareClass(
      data: { name: $name, enName: $enName, wareTypeId: $wareTypeId }
    ) {
      id
      name
      enName
      wareType {
        id
        name
      }
    }
  }
`;
