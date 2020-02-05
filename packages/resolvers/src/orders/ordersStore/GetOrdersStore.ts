import gql from "graphql-tag";

export const GQL_GET_STORE_ORDER = gql`
  query getStoreOrders($id: String!, $page: Int, $take: Int) {
    getStore(id: $id) {
      orders(pagination: { page: $page, take: $take }) {
        id
        status
        deliveryTime
        num
        trackingcode
        ware {
          name
          irc
        }

        createdAt
        organization {
          name
          userToSites {
            user {
              name
            }
          }
        }
      }
    }
  }
`;
