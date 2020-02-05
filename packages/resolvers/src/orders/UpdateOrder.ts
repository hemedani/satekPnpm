import gql from "graphql-tag";

export const GQL_UPDATE_ORDER = gql`
  mutation updateOrder($id: String!, $deliveryTime: DateTime) {
    updateOrder(data: { deliveryTime: $deliveryTime }, id: $id) {
      id
      status
      num
      createdAt
      trackingcode
      deliveryTime
      totalPrice
      remaining
      ware {
        id
        name
      }
      store {
        id
        name
      }
      requestorUser {
        id
        name
        lastName
      }
      unit {
        id
        address
        city {
          name
          id
        }
        state {
          name
          id
        }
      }
    }
  }
`;
