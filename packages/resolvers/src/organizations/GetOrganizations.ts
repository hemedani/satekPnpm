import gql from "graphql-tag";

export const GQL_GET_ORGANIZATIONS = gql`
  query getOrganizations(
    $page: Int
    $take: Int
    $document: String
    $universityId: String
  ) {
    getOrganizations(
      pagination: { page: $page, take: $take }
      data: { document: $document, universityId: $universityId }
    ) {
      id
      name
      logoUrl
      city {
        id
        name
      }
      state {
        id
        name
      }
      university {
        id
        name
      }
      contact
      location
      address
    }
  }
`;
