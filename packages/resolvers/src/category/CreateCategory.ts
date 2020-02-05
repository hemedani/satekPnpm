import gql from "graphql-tag";

export const GQL_CREATE_CATEGORY = gql`
  mutation createCategory(
    $name: String!
    $enName: String!
    $stateId: String!
    $cityId: String!
    $universityId: String!
    $organizationId: String!
  ) {
    createCategory(
      data: {
        name: $name
        enName: $enName
        stateId: $stateId
        cityId: $cityId
        universityId: $universityId
        organizationId: $organizationId
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
