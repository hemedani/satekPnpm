import gql from "graphql-tag";

export const GQL_GET_ORDER = gql`
  query getOrder($id: String!) {
    getOrder(id: $id) {
      id
      status
      requestorUser {
        id
        name
      }
      num
      recipientUser {
        id
        name
      }
      organization {
        id
        name
      }
      unit {
        id
        name
      }
      ware {
        id
        name
      }
      wareModel {
        id
      }
      wareGroup {
        id
        name
      }
    }
  }
`;
