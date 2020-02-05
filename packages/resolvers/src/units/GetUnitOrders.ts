import gql from "graphql-tag";

export const GQL_GET_UNIT_ORDERS = gql`
  query getUnitOrders($id: String!) {
    getUnit(id: $id) {
      id
      name
      orders {
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
  }
`;
