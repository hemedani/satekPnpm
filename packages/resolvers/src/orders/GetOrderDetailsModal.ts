import gql from "graphql-tag";

export const GQL_GET_ORDER_MODAL_DETAILS = gql`
  query getOrderModalDetails($id: String!) {
    getOrder(id: $id) {
      id
      status
      requestorUser {
        id
        name
      }
      num

      ware {
        id
        name
      }
      stuff {
        price
      }
      deliveryTime
      trackingcode
      status
      createdAt
      remaining
    }
  }
`;
