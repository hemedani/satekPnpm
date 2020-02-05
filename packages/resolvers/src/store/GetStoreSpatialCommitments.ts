import gql from "graphql-tag";

export const GQL_GET_STORE_SPATIAL_COMMITMENTS = gql`
  query getStoreSpatialCommitments($id: String!) {
    getStore(id: $id) {
      cityDeliveryTime
      id
      stateDeliveryTime
      countryDeliveryTime
      selectedStateDeliveryTime
      selectedStatesIds
      workingShift
      serviceRange
    }
  }
`;
