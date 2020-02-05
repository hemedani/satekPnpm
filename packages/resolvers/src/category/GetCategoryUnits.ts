import gql from "graphql-tag";

export const GQL_GET_CATEGORY_UNITS = gql`
  query getCategoryUnits($id: String!) {
    getCategory(id: $id) {
      id
      name
      enName
      units {
        id
        name
        address
        location
      }
    }
  }
`;
