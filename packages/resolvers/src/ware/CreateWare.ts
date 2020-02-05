import gql from "graphql-tag";

export const GQL_CREATE_WARE = gql`
  mutation createWare(
    $name: String!
    $enName: String
    $price: Int!
    $irc: String!
    $umdns: Int
    $gtin: Float
    $manufacturerId: String!
    $wareTypeId: String!
    $wareClassId: String!
    $wareGroupId: String!
    $wareModelId: String!
    $brand: String!
  ) {
    createWare(
      data: {
        name: $name
        enName: $enName
        price: $price
        irc: $irc
        umdns: $umdns
        gtin: $gtin
        manufacturerId: $manufacturerId
        wareTypeId: $wareTypeId
        wareClassId: $wareClassId
        wareGroupId: $wareGroupId
        wareModelId: $wareModelId
        brand: $brand
      }
    ) {
      id
      name
      enName
      price
      irc
      umdns
      manufacturername
      gtin
      wareType {
        name
        id
      }
      manufacturer {
        country
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
