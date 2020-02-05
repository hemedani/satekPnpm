import gql from "graphql-tag";

export const GQL_GET_INFO_SELLER = gql`
  query getInfoSeller($id: String!) {
    getStore(id: $id) {
      id
      ceoname
      storeDetails {
        ceoSsn
        mobileNumber
        ceoBirthDate
        ceoGender
        ceoPostalCode
        ceoAddress
        ceoContact
        ceoEmail
        ceoState {
          id
          name
        }
        ceoCity {
          id
          name
        }
      }
    }
  }
`;
