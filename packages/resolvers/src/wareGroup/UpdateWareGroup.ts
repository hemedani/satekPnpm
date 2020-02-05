import gql from "graphql-tag";

export const GQL_UPDATE_WARE_GROUP = gql`
  mutation updateWareGroup(
    $name: String!
    $enName: String!
    $wareTypeId: String!
    $wareClassIds: [String!]!
    $id: String!
  ) {
    updateWareGroup(
      data: {
        name: $name
        enName: $enName
        wareTypeId: $wareTypeId
        wareClassIds: $wareClassIds
      }
      id: $id
    ) {
      id
      name
      enName
      # wareClasses {
      #   id
      #   name
      # }
    }
  }
`;
