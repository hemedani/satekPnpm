import gql from "graphql-tag";

export const GQL_GET_CATEGORIES = gql`
  query getCategories(
    $page: Int
    $take: Int
    $name: String
    $enName: String
    $stateId: String
    $cityId: String
    $unitId: String
    $organizationId: String
    $universityId: String
  ) {
    getCategories(
      pagination: { page: $page, take: $take }
      data: {
        name: $name
        enName: $enName
        stateId: $stateId
        cityId: $cityId
        unitId: $unitId
        organizationId: $organizationId
        universityId: $universityId
      }
    ) {
      id
      name
      enName
      state {
        id
        name
      }
      city {
        id
        name
      }
      organization {
        id
        name
      }
      university {
        id
        name
      }
    }
  }
`;
