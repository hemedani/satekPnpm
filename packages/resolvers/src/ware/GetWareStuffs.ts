import gql from "graphql-tag";

export const GQL_GET_WARE_STUFF = gql`
  query getWareStuffs($id: String!) {
    getWare(id: $id) {
      stuffs {
        id
        expiration
        price
        pricePercentage
        hasAbsolutePrice
        store {
          name
          id
          city {
            id
            name
          }
        }
      }
    }
  }
`;
