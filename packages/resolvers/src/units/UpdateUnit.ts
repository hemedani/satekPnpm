import gql from "graphql-tag";

export const GQL_UPDATE_UNIT = gql`
  mutation updateUnit(
    $name: String!
    $address: String!
    $organizationId: String!
    $universityId: String!
    $cityId: String!
    $stateId: String!
    $logoUrl: String
    $contact: String
    $location: String
    $id: String!
    $categoryId: String!
  ) {
    updateUnit(
      data: {
        name: $name
        address: $address
        location: $location
        contact: $contact
        universityId: $universityId
        organizationId: $organizationId
        cityId: $cityId
        stateId: $stateId
        logoUrl: $logoUrl
        categoryId: $categoryId
      }
      id: $id
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
      university {
        id
        name
      }
      organization {
        id
        name
      }
      category {
        id
        enName
        name
      }
    }
  }
`;
