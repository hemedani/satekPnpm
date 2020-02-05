import gql from "graphql-tag";

export const GQL_CREATE_ORDER = gql`
  mutation createOrder(
    $num: Int!
    $wareId: String!
    $remaining: Int
    $organizationId: String!
    $unitId: String!
    $deliveryTime: DateTime!
    $requestorUserId: String!
    $stuffId: String
    $fastDelivery: Boolean!
    $fastDeliveryTime: FastDeliveryTime
  ) {
    createOrder(
      data: {
        num: $num
        wareId: $wareId
        organizationId: $organizationId
        unitId: $unitId
        deliveryTime: $deliveryTime
        requestorUserId: $requestorUserId
        remaining: $remaining
        stuffId: $stuffId
        fastDelivery: $fastDelivery
        fastDeliveryTime: $fastDeliveryTime
      }
    ) {
      id
      ware {
        name
        price
      }
      status
      trackingcode
      num
      createdAt
      deliveryTime
    }
  }
`;
