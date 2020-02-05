import gql from "graphql-tag";

export const GQL_GET_USERS = gql`
  query getUsers(
    $page: Int
    $take: Int
    $organizationId: String
    $unitId: String
    $document: String
    $role: UserRole
  ) {
    getUsers(
      pagination: { page: $page, take: $take }
      data: {
        organizationId: $organizationId
        unitId: $unitId
        document: $document
        role: $role
      }
    ) {
      items {
        id
        firstName
        lastName
        phoneNumber
        photoUrl
        userToSites {
          id
          role
          site {
            id
            name
          }
        }
      }
    }
  }
`;
