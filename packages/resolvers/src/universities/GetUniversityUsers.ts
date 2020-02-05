import gql from "graphql-tag";

export const GQL_GET_UNIVERSITY_USERS = gql`
  query getUniversityUser($id: String!) {
    getUniversity(id: $id) {
      id
      name
      userToSites {
        user {
          firstName
          lastName
          id
        }
      }
    }
  }
`;
