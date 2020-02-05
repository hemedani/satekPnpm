import gql from "graphql-tag";

export const GQL_UPDATE_STUFF = gql`
  mutation updateStuff(
    $expiration: DateTime!
    $availableLongPayment: [LongPayment!]
    $inventoryNo: Int!
    $hasAbsolutePrice: Boolean!
    $pricePercentage: Float
    $price: Int
    $wareId: String!
    $storeId: String!
    $barcode: Float!
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
    $id: String!
  ) {
    updateStuff(
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
      }
      id: $id
    ) {
      id
      expiration
      inventoryNo
      hasAbsolutePrice
      pricePercentage
      price
      twoMonthPricePercent
      threeMonthPricePercent
      fourMonthPricePercent
      fiveMonthPricePercent
      sixMonthPricePercent
      sevenMonthPricePercent
      eightMonthPricePercent
      nineMonthPricePercent
      tenMonthPricePercent
      elevenMonthPricePercent
      twelveMonthPricePercent
      eighteenMonthPricePercent
      twentyFourMonthPricePercent
      availableLongPayment
      ware {
        id
        name
        enName
        price
        irc
        manufacturername
        manufacturer {
          country
          name
          id
        }
        wareGroup {
          name
          id
          # wareClasses {
          #   name
          #   id
          # }
        }
      }
    }
  }
`;
