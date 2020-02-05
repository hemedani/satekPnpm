import gql from "graphql-tag";

export const GQL_GET_WARES = gql`
  query getWares(
    $page: Int
    $take: Int
    $wareClassId: String
    $wareGroupId: String
    $document: String
    $wareModelId: String
    $userId: String
  ) {
    getWares(
      pagination: { page: $page, take: $take }
      data: {
        wareClassId: $wareClassId
        wareGroupId: $wareGroupId
        document: $document
        wareModelId: $wareModelId
        userId: $userId
      }
    ) {
      id
      name
      enName
      price
      irc
      manufacturername
      manufacturer {
        country
        name
        id
      }
      wareGroup {
        name
        id
      }
      wareClass {
        name
        id
      }
    }
  }
`;
