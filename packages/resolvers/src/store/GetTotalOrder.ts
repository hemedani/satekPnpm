import gql from "graphql-tag";

export const GQL_GET_STORE_TOTAL_ORDER = gql`
  query getTotalOrder($id: String!) {
    getStore(id: $id) {
      totalFastDelivery
      totalNewOrder
      totalNotCompleted
    }
  }
`;
