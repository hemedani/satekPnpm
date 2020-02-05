import gql from "graphql-tag";

export const GQL_UPDATE_STORE_STATUS = gql`
  mutation updateStoreStatus(
    $id: String!
    $storeStatus: StoreStatus!
    $updateStatusDescription: String!
    $isActive: Boolean!
  ) {
    updateStoreStatus(
      data: {
        status: $storeStatus
        updateStatusDescription: $updateStatusDescription
        isActive: $isActive
      }
      id: $id
    ) {
      id
      name
      ceoname
      storeDetails {
        mobileNumber
      }
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
