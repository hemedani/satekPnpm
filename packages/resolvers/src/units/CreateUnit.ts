import gql from "graphql-tag";

export const GQL_CREATE_UNIT = gql`
  mutation createUnit(
    $name: String!
    $address: String!
    $location: String
    $logoUrl: String
    $contact: String
    $organizationId: String!
    $stateId: String!
    $cityId: String!
    $universityId: String!
    $categoryId: String!
  ) {
    createUnit(
      data: {
        name: $name
        address: $address
        logoUrl: $logoUrl
        location: $location
        contact: $contact
        organizationId: $organizationId
        stateId: $stateId
        cityId: $cityId
        universityId: $universityId
        categoryId: $categoryId
      }
    ) {
      id
      logoUrl
      name
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
      category {
        id
        name
        enName
      }
    }
  }
`;
