import gql from "graphql-tag";

export const GQL_GET_STORE_STATISTICS = gql`
  query getStoreStatistics($id: String!) {
    getStore(id: $id) {
      id
      totalSoldAmount
      totalSoldNum
      totalPaid
      totalNotPaid
    }
  }
`;
