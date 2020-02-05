import gql from "graphql-tag";

export const GQL_GET_CITY_UNIVERSITIES = gql`
  query getCityUniversities($id: String!) {
    getCity(id: $id) {
      id
      name
      universities {
        id
        name
      }
    }
  }
`;
