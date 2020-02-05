import gql from "graphql-tag";

export const GQL_REGISTER = gql`
  mutation registerStaff(
    $firstName: String!
    $lastName: String!
    $ssn: String!
    $phoneNumber: String!
    $password: String!
    $photoUrl: String
  ) {
    registerStaff(
      data: {
        firstName: $firstName
        lastName: $lastName
        ssn: $ssn
        phoneNumber: $phoneNumber
        password: $password
        photoUrl: $photoUrl
      }
    ) {
      id
      name
    }
  }
`;
