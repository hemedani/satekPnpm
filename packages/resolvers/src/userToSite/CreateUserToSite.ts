import gql from "graphql-tag";

export const GQL_CREATE_USER_TO_SITE = gql`
  mutation createUserToSite(
    $role: UserRole!
    $userId: String!
    $siteId: String
  ) {
    createUserToSite(data: { role: $role, userId: $userId, siteId: $siteId }) {
      id
      role
    }
  }
`;
