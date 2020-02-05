import gql from "graphql-tag";

export const GQL_GET_STUFF = gql`
  query getStuff($id: String!) {
    getStuff(id: $id) {
      id
      ware {
        id
        name
        enName
        price
        irc
        manufacturername
        manufacturer {
          country
        }
        wareGroup {
          name
          # wareClasses {
          #   name
          # }
        }
      }
    }
  }
`;
