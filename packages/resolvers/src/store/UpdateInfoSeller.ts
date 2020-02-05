import gql from "graphql-tag";

export const GQL_UPDATE_INFO_SELLER = gql`
  mutation updateInfoSeller(
    $ceoname: String
    $ceoSsn: String
    $mobileNumber: String
    $ceoGender: Gender
    $ceoCityId: String
    $ceoStateId: String
    $ceoPostalCode: String
    $ceoAddress: String
    $ceoContact: String
    $ceoBirthDate: DateTime
    $ceoEmail: String
    $id: String!
  ) {
    updateStore(
      data: {
        ceoname: $ceoname
        ceoSsn: $ceoSsn
        mobileNumber: $mobileNumber
        ceoGender: $ceoGender
        ceoCityId: $ceoCityId
        ceoStateId: $ceoStateId
        ceoPostalCode: $ceoPostalCode
        ceoBirthDate: $ceoBirthDate
        ceoAddress: $ceoAddress
        ceoContact: $ceoContact
        ceoEmail: $ceoEmail
      }
      id: $id
    ) {
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
