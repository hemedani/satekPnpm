import gql from "graphql-tag";

export const GQL_UPDATE_FAVORITE_WARES_USER = gql`
  mutation UpdateFavoriteWareUser(
    $favoriteWaresIds: [String!]
    $password: String
    $photoUrl: String
    $page: Int
    $take: Int
  ) {
    updateUser(
      data: {
        favoriteWaresIds: $favoriteWaresIds
        password: $password
        photoUrl: $photoUrl
      }
    ) {
      favoriteWaresIds
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
