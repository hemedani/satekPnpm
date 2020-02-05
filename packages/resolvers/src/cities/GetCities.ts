import gql from "graphql-tag";

export const GQL_GET_CITIES = gql`
  query getCities($page: Int, $take: Int, $document: String, $stateId: String) {
    getCities(
      pagination: { page: $page, take: $take }
      data: { document: $document, stateId: $stateId }
    ) {
      id
      name
    }
  }
`;
