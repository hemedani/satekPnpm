import gql from "graphql-tag";

export const GQL_GET_USER_TO_SITES = gql`
  query getUserToSites($page: Int, $take: Int) {
    getUserToSites(pagination: { page: $page, take: $take }) {
      id
    }
  }
`;
