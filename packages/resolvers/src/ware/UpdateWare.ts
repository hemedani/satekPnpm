import gql from "graphql-tag";

export const GQL_UPDATE_WARE = gql`
  mutation updateWare(
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
    $id: String!
    $brand: String!
  ) {
    updateWare(
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
      id: $id
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
      umdns
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
