import gql from "graphql-tag";

export const GQL_GET_STUFF_EDIT = gql`
  query getStuffEdit($id: String!) {
    getStuff(id: $id) {
      id
      expiration
      inventoryNo
      hasAbsolutePrice
      pricePercentage
      price
      barcode
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
