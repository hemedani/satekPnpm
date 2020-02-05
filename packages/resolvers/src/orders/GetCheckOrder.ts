import gql from "graphql-tag";

export const GQL_GET_CHECK_ORDER = gql`
  query getCheckOrder($id: String!) {
    getOrder(id: $id) {
      id
      stuff {
        expiration
        id
        store {
          name
        }
      }
      num
      commentByExpert
      commentByFinance
      commentByExpertStatus
      commentByFinanceStatus
      status
      chosenPayment
      longPayment
      ware {
        id
        name
        price
        manufacturername
      }
      requestorUser {
        id
        name
        lastName
      }
      createdAt
      totalPrice
    }
  }
`;
