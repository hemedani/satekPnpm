import gql from "graphql-tag";

export const GQL_GET_UNIT_PARENTS = gql`
  query getUnitParents($id: String!) {
    getUnit(id: $id) {
      id
      university {
        name
        id
      }
      organization {
        id
        name
      }
      category {
        id
        name
        enName
      }
    }
  }
`;
