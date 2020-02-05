import gql from "graphql-tag";

export const GQL_GET_UNIVERSITIES = gql`
  query getUniversities(
    $page: Int
    $take: Int
    $document: String
    $stateId: String
  ) {
    getUniversities(
      pagination: { page: $page, take: $take }
      data: { document: $document, stateId: $stateId }
    ) {
      id
      name
      logoUrl
      state {
        id
        name
      }
      city {
        id
        name
      }
    }
  }
`;
