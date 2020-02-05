import gql from "graphql-tag";

export const GQL_UPDATE_INFO_STORE = gql`
  mutation updateInfoStore(
    $name: String
    $contact: String
    $economicCode: String
    $postalCode: String
    $email: String
    $cityId: String
    $stateId: String
    $address: String
    $activityScope: ActivityScope
    $id: String!
  ) {
    updateStore(
      data: {
        name: $name
        contact: $contact
        economicCode: $economicCode
        postalCode: $postalCode
        email: $email
        cityId: $cityId
        stateId: $stateId
        activityScope: $activityScope
        address: $address
      }
      id: $id
    ) {
      id
      name
      activityScope

      state {
        id
        name
      }
      city {
        id
        name
      }
      storeDetails {
        postalCode
        email
        economicCode
      }
      contact
      address
    }
  }
`;
