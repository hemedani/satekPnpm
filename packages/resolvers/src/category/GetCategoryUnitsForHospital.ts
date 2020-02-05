import gql from "graphql-tag";

export const GQL_GET_CATEGORY_UNITS_FOR_HOSPITAL = gql`
  query GetCategoryUnitsForHospital($id: String!) {
    getCategory(id: $id) {
      id
      units {
        id
        name
        orderStatistic {
          id
          pendingInOrgHeadNumber
        }
      }
    }
  }
`;
