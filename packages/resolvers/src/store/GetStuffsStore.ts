import gql from "graphql-tag";

export const GQL_GET_STUFFS_STORE = gql`
  query getStuffsStore($id: String!, $page: Int, $take: Int) {
    getStore(id: $id) {
      id
      stuffs(pagination: { page: $page, take: $take }) {
        id
        inventoryNo
        expiration
        price
        ware {
          id
          name
          enName
          # wareGroup {
          #   wareClass {
          #     name
          #   }
          # }
          manufacturername
        }
      }
    }
  }
`;
