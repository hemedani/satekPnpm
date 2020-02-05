import gql from "graphql-tag";

export const GQL_GET_ORDERS = gql`
  query getOrders(
    $page: Int
    $take: Int
    $wareDocument: String
    $fastDelivery: Boolean
    $trackingcode: String
    $organizationId: String
    $unitId: String
    $storeId: String
    $statuses: [OrderStatus!]
    $irc: String
    $commentByExpertStatusInput: ExpertCommentStatusInput
    $commentByFinanceStatusInput: CommentByFinanceStatusInput
    $checkBySupplierStatusInput: CheckBySupplierStatusInput
    $checkByStockclerkStatusInput: CheckByStockclerkStatusInput
    $checkBySupplier: CheckBySupplier
    $checkByStockclerk: CheckByStockclerk
    $startDate: DateTime
    $endDate: DateTime
    $wareTypeId: String
    $wareClassId: String
    $wareGroupId: String
    $wareModelId: String
    $sort: OrderSort
  ) {
    getOrders(
      pagination: { page: $page, take: $take }
      sort: $sort
      data: {
        wareDocument: $wareDocument
        trackingcode: $trackingcode
        fastDelivery: $fastDelivery
        organizationId: $organizationId
        unitId: $unitId
        storeId: $storeId
        statuses: $statuses
        irc: $irc
        commentByExpertStatusInput: $commentByExpertStatusInput
        commentByFinanceStatusInput: $commentByFinanceStatusInput
        checkBySupplierStatusInput: $checkBySupplierStatusInput
        checkByStockclerkStatusInput: $checkByStockclerkStatusInput
        checkBySupplier: $checkBySupplier
        checkByStockclerk: $checkByStockclerk
        startDate: $startDate
        endDate: $endDate
        wareTypeId: $wareTypeId
        wareClassId: $wareClassId
        wareGroupId: $wareGroupId
        wareModelId: $wareModelId
      }
    ) {
      items {
        id
        status
        num
        createdAt
        trackingcode
        fastDelivery
        fastDeliveryTime
        deliveryTime
        totalPrice # new add
        commentByExpertStatus #new add
        commentByFinanceStatus #new add
        organization {
          id
          name
        }
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
          name
        }
        # unit {
        #   id
        #   address
        #   city {
        #     name
        #     id
        #   }
        #   state {
        #     name
        #     id
        #   }
        # }

        # stuff {
        #   ware {
        #     manufacturername
        #   }
        #   expiration
        # }
      }
    }
  }
`;
