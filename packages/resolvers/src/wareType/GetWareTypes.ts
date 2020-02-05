import gql from "graphql-tag";

export const GQL_GET_WARE_TYPES = gql`
  query getWareTypes($page: Int, $take: Int) {
    getWareTypes(pagination: { page: $page, take: $take }) {
      id
      name
      enName
    }
  }
`;
