import gql from "graphql-tag";

export const GQL_UPDATE_ORDER_STUFF_STATUS = gql`
  mutation updateOrderStuffStatus(
    $stuffId: String!
    $status: OrderStatus!
    $id: String!
    $num: Int
    $chosenPayment: ChosenPayment
    $longPayment: LongPayment
  ) {
    updateOrderStuff(
      data: {
        stuffId: $stuffId
        status: $status
        num: $num
        chosenPayment: $chosenPayment
        longPayment: $longPayment
      }
      orderId: $id
    ) {
      id
      status
      num
    }
  }
`;
