import gql from "graphql-tag";

export const GQL_GET_STORES = gql`
  query getStores(
    $page: Int
    $take: Int
    $status: StoreStatus
    $cityId: String
    $stateId: String
    $document: String
  ) {
    getStores(
      pagination: { page: $page, take: $take }
      data: {
        status: $status
        cityId: $cityId
        stateId: $stateId
        document: $document
      }
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
