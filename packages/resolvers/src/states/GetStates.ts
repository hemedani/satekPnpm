import gql from "graphql-tag";

export const GQL_GET_STATES = gql`
  query getStates($page: Int, $take: Int, $document: String) {
    getStates(
      pagination: { page: $page, take: $take }
      data: { document: $document }
    ) {
      id
      name
    }
  }
`;
