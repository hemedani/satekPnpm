import gql from "graphql-tag";

export const GQL_GET_CATEGORY = gql`
  query getCategory($id: String!) {
    getCategory(id: $id) {
      id
      name
      enName
      city {
        id
        name
      }
      state {
        id
        name
      }
      university {
        id
        name
      }
      organization {
        id
        name
      }
    }
  }
`;
