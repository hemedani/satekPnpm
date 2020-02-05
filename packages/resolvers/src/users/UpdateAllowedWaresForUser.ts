import gql from "graphql-tag";

export const GQL_UPDATE_ALLOWED_WARES_FOR_USER = gql`
  mutation updateAllowedWaresForUser(
    $allowedWaresIds: [String!]!
    $userId: String!
  ) {
    updateAllowedWaresForUser(
      data: { allowedWaresIds: $allowedWaresIds }
      userId: $userId
    ) {
      id
      allowedWares {
        id
        name
      }
    }
  }
`;
