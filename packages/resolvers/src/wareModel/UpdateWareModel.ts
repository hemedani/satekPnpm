import gql from "graphql-tag";

export const GQL_UPDATE_WARE_MODEL = gql`
  mutation updateWareModel(
    $name: String!
    $enName: String!
    $id: String!
    $wareClassId: String!
    $wareGroupId: String!
    $wareTypeId: String!
  ) {
    updateWareModel(
      data: {
        name: $name
        enName: $enName
        wareGroupId: $wareGroupId
        wareClassId: $wareClassId
        wareTypeId: $wareTypeId
      }
      id: $id
    ) {
      id
      name
      enName
    }
  }
`;
