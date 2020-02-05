import gql from "graphql-tag";

export const GQL_CREATE_UNIVERSITY = gql`
  mutation createUniversity(
    $name: String!
    $address: String!
    $location: String
    $contact: String
    $cityId: String!
    $stateId: String!
  ) {
    createUniversity(
      data: {
        name: $name
        address: $address
        location: $location
        contact: $contact
        cityId: $cityId
        stateId: $stateId
      }
    ) {
      id
      name
      logoUrl
      location
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
