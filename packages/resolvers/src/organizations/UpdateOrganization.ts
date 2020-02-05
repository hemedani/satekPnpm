import gql from "graphql-tag";

export const GQL_UPDATE_ORGANIZATION = gql`
  mutation updateOrganization(
    $name: String!
    $address: String!
    $universityId: String!
    $cityId: String!
    $stateId: String!
    $logoUrl: String
    $contact: String
    $location: String
    $id: String!
  ) {
    updateOrganization(
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
      id: $id
    ) {
      id
      name
      logoUrl
      city {
        id
        name
      }
      state {
        id
        name
      }
      university {
        id
        name
      }
      contact
      location
      address
    }
  }
`;
