import gql from "graphql-tag";

export const GQL_GET_ORDER_CLIENT = gql`
  query getOrderForClient($id: String!) {
    getOrder(id: $id) {
      id
      status
      num
      trackingcode
      fastDelivery
      fastDeliveryTime
      deliveryTime
      totalPrice
      wareGroup { #new
        name
        id
      }
      wareModel { #new
        name
        id
      }
      ware {
        id
        name
        enName
        manufacturer {
          id
          name
          country
        }
      }
      stuff {
        price
        barcode
        expiration
      }
    }
  }
`;
