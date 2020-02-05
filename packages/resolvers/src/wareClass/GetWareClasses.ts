import gql from "graphql-tag";

export const GQL_GET_WARE_CLASSES = gql`
  query getWareClasses(
    $page: Int
    $take: Int
    $wareGroupId: String
    $wareTypeId: String
  ) {
    getWareClasses(
      data: { wareGroupId: $wareGroupId, wareTypeId: $wareTypeId }
      pagination: { page: $page, take: $take }
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
