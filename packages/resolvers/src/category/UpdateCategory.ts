import gql from "graphql-tag";

export const GQL_UPDATE_CATEGORY = gql`
  mutation updateCategory(
    $id: String!
    $name: String!
    $enName: String!
    $organizationId: String!
    $universityId: String!
    $cityId: String!
    $stateId: String!
  ) {
    updateCategory(
      data: {
        name: $name
        enName: $enName
        universityId: $universityId
        organizationId: $organizationId
        cityId: $cityId
        stateId: $stateId
      }
      id: $id
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
