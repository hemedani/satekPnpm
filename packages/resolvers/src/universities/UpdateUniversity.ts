import gql from "graphql-tag";

export const GQL_UPDATE_UNIVERSITY = gql`
  mutation updateUniversity(
    $name: String!
    $logoUrl: String
    $address: String!
    $location: String
    $contact: String
    $cityId: String!
    $stateId: String!
    $id: String!
  ) {
    updateUniversity(
      data: {
        logoUrl: $logoUrl
        name: $name
        address: $address
        location: $location
        contact: $contact
        cityId: $cityId
        stateId: $stateId
      }
      id: $id
    ) {
      id
      name
      logoUrl
      state {
        id
        name
      }
      city {
        id
        name
      }
    }
  }
`;
