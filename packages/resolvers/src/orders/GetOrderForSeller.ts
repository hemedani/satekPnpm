import gql from "graphql-tag";

export const GQL_GET_ORDER_SELLER = gql`
  query getOrderForSeller($id: String!) {
    getOrder(id: $id) {
      id
      status
      num
      createdAt
      trackingcode
      fastDelivery
      fastDeliveryTime
      deliveryTime
      totalPrice
      organization {
        id
        name
      }
      ware {
        id
        name
        enName

        manufacturer {
          name
          country
        }
      }
      wareGroup {
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
        phoneNumber
      }
      unit {
        id
        address
        name
        city {
          name
          id
        }
        state {
          name
          id
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
