import gql from "graphql-tag";

export const GQL_GET_STORE_TOTAL_FAST_DELIVERY = gql`
  query getStoreTotalFastDelivery($id: String!) {
    getStore(id: $id) {
      totalFastDelivery
    }
  }
`;
