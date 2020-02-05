import gql from "graphql-tag";

export const GQL_GET_USER = gql`
  query getUser($id: String!) {
    getUser(id: $id) {
      id
      firstName
      lastName
      ssn
      phoneNumber
      photoUrl
    }
  }
`;
