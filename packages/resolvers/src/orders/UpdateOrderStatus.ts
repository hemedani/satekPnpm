import gql from "graphql-tag";

export const GQL_UPDATE_ORDER_STATUS = gql`
  mutation updateOrderStatus(
    $id: String!
    $orderStatus: OrderStatus!
    $comment: String
    $commentByExpertStatus: ExpertCommentStatus
    $commentByFinanceStatus: FinanceCommentStatus
    $checkByExpert: CheckByExpert
    $checkByFinance: CheckByFinance
  ) {
    updateOrderStatus(
      data: {
        orderStatus: $orderStatus
        comment: $comment
        commentByExpertStatus: $commentByExpertStatus
        commentByFinanceStatus: $commentByFinanceStatus
        checkByExpert: $checkByExpert
        checkByFinance: $checkByFinance
      }
      id: $id
    ) {
      id
      status
      num
      createdAt
      trackingcode
      deliveryTime
      totalPrice
      fastDelivery #new add
      fastDeliveryTime #new add
      commentByExpertStatus
      commentByFinanceStatus
      organization {
        #new add
        id #new add
        name #new add
      } #new add
      ware {
        id
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
      }
      unit {
        id
        address
        # city { new comment
        #   name
        #   id
        # }
        # state {
        #   name
        #   id
        # }new comment
      }
    }
  }
`;
