import gql from "graphql-tag";

export const GQL_GET_WARE = gql`
  query getWare($id: String!) {
    getWare(id: $id) {
      id
      name
      enName
      price
      irc
      umdns
      gtin
      manufacturername
      manufacturer {
        country
        name
        id
      }
      wareType {
        name
        id
      }
      wareGroup {
        name
        id
      }
      wareClass {
        name
        id
      }
      wareModel {
        name
        id
      }
    }
  }
`;
