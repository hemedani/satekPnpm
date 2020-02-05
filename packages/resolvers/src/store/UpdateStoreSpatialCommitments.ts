import gql from "graphql-tag";

export const GQL_UPDATE_SPATIAL_COMMITMENTS = gql`
  mutation updateStoreSpatialCommitments(
    $selectedStatesIds: [String!]
    $cityDeliveryTime: DeliveryTime
    $stateDeliveryTime: DeliveryTime
    $selectedStateDeliveryTime: DeliveryTime
    $countryDeliveryTime: DeliveryTime
    $workingShift: WorkingShift
    $serviceRange: [ServiceRange!]
    $id: String!
  ) {
    updateStore(
      data: {
        selectedStatesIds: $selectedStatesIds
        cityDeliveryTime: $cityDeliveryTime
        stateDeliveryTime: $stateDeliveryTime
        selectedStateDeliveryTime: $selectedStateDeliveryTime
        countryDeliveryTime: $countryDeliveryTime
        workingShift: $workingShift
        serviceRange: $serviceRange
      }
      id: $id
    ) {
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
