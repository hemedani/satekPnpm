import gql from "graphql-tag";

export const GQL_CREATE_STUFF = gql`
  mutation createStuff(
    $expiration: DateTime!
    $availableLongPayment: [LongPayment!]
    $inventoryNo: Int!
    $hasAbsolutePrice: Boolean!
    $pricePercentage: Float
    $price: Int
    $wareId: String!
    $storeId: String!
    $barcode: Float
    $isExpiring: Boolean
    $twoMonthPricePercent: Float
    $threeMonthPricePercent: Float
    $fourMonthPricePercent: Float
    $fiveMonthPricePercent: Float
    $sixMonthPricePercent: Float
    $sevenMonthPricePercent: Float
    $eightMonthPricePercent: Float
    $nineMonthPricePercent: Float
    $tenMonthPricePercent: Float
    $elevenMonthPricePercent: Float
    $twelveMonthPricePercent: Float
    $eighteenMonthPricePercent: Float
    $twentyFourMonthPricePercent: Float
    $isBarcodeSet: Boolean
  ) {
    createStuff(
      data: {
        availableLongPayment: $availableLongPayment
        expiration: $expiration
        inventoryNo: $inventoryNo
        hasAbsolutePrice: $hasAbsolutePrice
        pricePercentage: $pricePercentage
        price: $price
        wareId: $wareId
        storeId: $storeId
        barcode: $barcode
        isExpiring: $isExpiring
        twoMonthPricePercent: $twoMonthPricePercent
        threeMonthPricePercent: $threeMonthPricePercent
        fourMonthPricePercent: $fourMonthPricePercent
        fiveMonthPricePercent: $fiveMonthPricePercent
        sixMonthPricePercent: $sixMonthPricePercent
        sevenMonthPricePercent: $sevenMonthPricePercent
        eightMonthPricePercent: $eightMonthPricePercent
        nineMonthPricePercent: $nineMonthPricePercent
        tenMonthPricePercent: $tenMonthPricePercent
        elevenMonthPricePercent: $elevenMonthPricePercent
        twelveMonthPricePercent: $twelveMonthPricePercent
        eighteenMonthPricePercent: $eighteenMonthPricePercent
        twentyFourMonthPricePercent: $twentyFourMonthPricePercent
        isBarcodeSet: $isBarcodeSet
      }
    ) {
      id
      inventoryNo
      expiration
      price

      ware {
        id
        name
        enName
        # wareGroup {
        #   id
        #   wareClass {
        #     name
        #   }
        # }
        manufacturername
      }
    }
  }
`;
