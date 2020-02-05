import gql from "graphql-tag";

export const GQL_GET_UNIVERSITY_ORGANIZATIONS = gql`
  query getUniversityOrganizations($id: String!) {
    getUniversity(id: $id) {
      id
      name
      organizations {
        id
        name
        address
        location
      }
    }
  }
`;
