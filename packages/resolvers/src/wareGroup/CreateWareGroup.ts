import gql from "graphql-tag";

export const GQL_CREATE_WARE_GROUP = gql`
  mutation createWareGroup(
    $name: String!
    $enName: String!
    $wareTypeId: String!
    $wareClassIds: [String!]!
  ) {
    createWareGroup(
      data: {
        name: $name
        enName: $enName
        wareTypeId: $wareTypeId
        wareClassIds: $wareClassIds
      }
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
