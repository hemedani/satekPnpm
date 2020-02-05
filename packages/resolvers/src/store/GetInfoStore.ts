import gql from "graphql-tag";

export const GQL_GET_INFO_STORE = gql`
  query getInfoStore($id: String!) {
    getStore(id: $id) {
      name
      activityScope
      id
      state {
        id
        name
      }
      city {
        id
        name
      }
      storeDetails {
        postalCode
        email
        economicCode
      }
      contact
      address
    }
  }
`;
