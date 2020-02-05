import gql from "graphql-tag";

export const GQL_GET_ME_SIDEBAR = gql`
  query meSidebar {
    me {
      id
      firstName
      lastName
      userToSites {
        site {
          name
          id
        }
      }
    }
  }
`;
