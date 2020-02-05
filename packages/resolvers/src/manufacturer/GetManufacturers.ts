import gql from "graphql-tag";

export const GQL_GET_MANUFACTURERS = gql`
  query getManufacturers($page: Int, $take: Int) {
    getManufacturers(pagination: { page: $page, take: $take }) {
      id
      name
    }
  }
`;
