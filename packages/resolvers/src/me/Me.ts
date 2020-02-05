import gql from "graphql-tag";

export const GQL_GET_ME = gql`
  query me {
    me @connection(key: "me") {
      id
      firstName
      lastName
      userToSites {
        id
        role
        site {
          name
          id
        }
      }
    }
  }
`;
