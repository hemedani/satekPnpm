import gql from "graphql-tag";

export const GQL_CREATE_ORGANIZATION = gql`
  mutation createOrganization(
    $name: String!
    $address: String!
    $universityId: String!
    $cityId: String!
    $stateId: String!
    $logoUrl: String
    $contact: String
    $location: String
  ) {
    createOrganization(
      data: {
        name: $name
        address: $address
        location: $location
        contact: $contact
        universityId: $universityId
        cityId: $cityId
        stateId: $stateId
        logoUrl: $logoUrl
      }
    ) {
      id
      name
      location
      logoUrl
      contact
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
    }
  }
`;
