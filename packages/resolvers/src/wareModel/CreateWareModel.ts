import gql from "graphql-tag";

export const GQL_CREATE_WARE_MODEL = gql`
  mutation createWareModel(
    $name: String!
    $enName: String!
    $wareClassId: String!
    $wareGroupId: String!
    $wareTypeId: String!
  ) {
    createWareModel(
      data: {
        name: $name
        enName: $enName
        wareClassId: $wareClassId
        wareGroupId: $wareGroupId
        wareTypeId: $wareTypeId
      }
    ) {
      id
      name
      enName
      wareClass {
        name
        wareType {
          name
        }
      }
      wareGroup {
        name
      }
    }
  }
`;
