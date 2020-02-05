import gql from "graphql-tag";

export const GQL_UPDATE_USER_DATA = gql`
  mutation updateUserData(
    $firstName: String!
    $lastName: String!
    $ssn: String!
    $phoneNumber: String!
    $photoUrl: String
    $password: String
    $allowedWaresIds: [String!]!
    $id: String!
  ) {
    updateUserData(
      data: {
        firstName: $firstName
        lastName: $lastName
        ssn: $ssn
        phoneNumber: $phoneNumber
        photoUrl: $photoUrl
        password: $password
        allowedWaresIds: $allowedWaresIds
      }
      userId: $id
    ) {
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
`;
