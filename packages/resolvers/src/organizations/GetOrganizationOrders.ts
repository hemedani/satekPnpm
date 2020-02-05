import gql from "graphql-tag";

export const GQL_GET_ORGANIZATION_ORDERS = gql`
  query getOrganizationOrders($id: String!) {
    getOrganization(id: $id) {
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
