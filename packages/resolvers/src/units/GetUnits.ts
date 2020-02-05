import gql from "graphql-tag";

export const GQL_GET_UNITS = gql`
  query getUnits(
    $page: Int
    $take: Int
    $document: String
    $organizationId: String
  ) {
    getUnits(
      pagination: { page: $page, take: $take }
      data: { document: $document, organizationId: $organizationId }
    ) {
      id
      logoUrl
      name
      state {
        id
        name
      }
      city {
        id
        name
      }
      organization {
        id
        name
      }
      university {
        id
        name
      }
      category {
        id
        enName
        name
      }
    }
  }
`;
