import gql from "graphql-tag";

export const GQL_GET_FAVORITE_WARES_DETAILS_USER = gql`
  query getFavoriteWaresDetailsUser($id: String!, $page: Int, $take: Int) {
    getUser(id: $id) {
      favoriteWares(pagination: { page: $page, take: $take }) {
        id
        name
        enName
        wareGroup {
          id
          name
          # wareClasses {
          #   name
          #   enName
          #   id
          # }
        }
        manufacturer {
          country
          name
          enName
        }
      }
    }
  }
`;
