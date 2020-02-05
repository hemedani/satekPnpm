import gql from "graphql-tag";

export const GQL_GET_STUFFS = gql`
  query getStuffs(
    $wareDocument: String
    $wareTypeId: String
    $wareClassIds: [String!]
    $wareGroupIds: [String!]
    $wareModelId: String
    $manufacturerId: String
    $storeId: String
    $wareId: String
    $storeHeadId: String
    $inventoryNo: Int
    $expiration: DateTime
    $longPayment: LongPayment
    $getTotal: Boolean
    $sort: StuffSort
    $page: Int
    $take: Int
  ) {
    getStuffs(
      sort: $sort
      pagination: { page: $page, take: $take }
      data: {
        wareDocument: $wareDocument
        wareTypeId: $wareTypeId
        wareClassIds: $wareClassIds
        wareGroupIds: $wareGroupIds
        wareModelId: $wareModelId
        manufacturerId: $manufacturerId
        storeId: $storeId
        wareId: $wareId
        storeHeadId: $storeHeadId
        inventoryNo: $inventoryNo
        expiration: $expiration
        longPayment: $longPayment
        getTotal: $getTotal
      }
    ) {
      items {
        id
        inventoryNo
        price
        expiration
        twoMonth
        threeMonth
        fourMonth
        fiveMonth
        sixMonth
        sevenMonth
        eightMonth
        nineMonth
        tenMonth
        elevenMonth
        twelveMonth
        eighteenMonth
        twentyFourMonth
      }
    }
  }
`;
