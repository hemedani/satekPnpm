import gql from "graphql-tag";

export const GQL_GET_ALLOWED_WARES_DETAILS_USER = gql`
  query getAllowedWaresDetailsUser($id: String!, $page: Int, $take: Int) {
    getUser(id: $id) {
      id
      name
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
      allowedWares {
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
