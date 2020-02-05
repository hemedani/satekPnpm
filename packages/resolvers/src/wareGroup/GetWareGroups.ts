import gql from "graphql-tag";

export const GQL_GET_WARE_GROUPS = gql`
  query getWareGroups(
    $page: Int
    $take: Int
    $wareClassId: String
    $document: String
  ) {
    getWareGroups(
      data: { wareClassId: $wareClassId, document: $document }
      pagination: { page: $page, take: $take }
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
