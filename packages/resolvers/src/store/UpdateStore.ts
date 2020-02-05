import gql from "graphql-tag";

export const GQL_UPDATE_STORE = gql`
  mutation updateStore(
    $name: String
    $address: String
    $location: String
    $contact: String
    $storeType: StoreType
    $economicCode: String
    $postalCode: String
    $email: String
    $ceoname: String
    $ceoSsn: String
    $mobileNumber: String
    $ceoBirthDate: DateTime
    $ceoGender: Gender
    $ceoCityId: String
    $ceoStateId: String
    $ceoPostalCode: String
    $ceoAddress: String
    $ceoContact: String
    $ceoEmail: String
    $cardMelliUrl: String
    $lastNewspaperUrl: String
    $mojavvezUrl: String
    $ceoPhotoUrl: String
    $bankCardNumber: String
    $shebaNumber: String
    $nameOfAccountHolder: String
    $bankName: String
    $selectedStatesIds: [String!]
    $cityDeliveryTime: DeliveryTime
    $stateDeliveryTime: DeliveryTime
    $selectedStateDeliveryTime: DeliveryTime
    $countryDeliveryTime: DeliveryTime
    $cityId: String!
    $stateId: String!
    $fastDelivery: Boolean!
    $activityScope: ActivityScope!
    $paymentDeadLine: PaymentDeadLine!
    $serviceRange: [ServiceRange!]!
    $workingShift: WorkingShift!
    $certificateNumber: String!
    $certificateExpireDate: DateTime!
    $legalPerson: LegalPerson!
    $nationalId: String!
    $id: String!
    $page: Int
    $take: Int
  ) {
    updateStore(
      data: {
        name: $name
        address: $address
        location: $location
        contact: $contact
        storeType: $storeType
        economicCode: $economicCode
        postalCode: $postalCode
        email: $email
        ceoname: $ceoname
        ceoSsn: $ceoSsn
        mobileNumber: $mobileNumber
        ceoBirthDate: $ceoBirthDate
        ceoGender: $ceoGender
        ceoCityId: $ceoCityId
        ceoStateId: $ceoStateId
        ceoPostalCode: $ceoPostalCode
        ceoAddress: $ceoAddress
        ceoContact: $ceoContact
        ceoEmail: $ceoEmail
        cardMelliUrl: $cardMelliUrl
        lastNewspaperUrl: $lastNewspaperUrl
        mojavvezUrl: $mojavvezUrl
        ceoPhotoUrl: $ceoPhotoUrl
        bankCardNumber: $bankCardNumber
        shebaNumber: $shebaNumber
        nameOfAccountHolder: $nameOfAccountHolder
        bankName: $bankName
        selectedStatesIds: $selectedStatesIds
        cityDeliveryTime: $cityDeliveryTime
        stateDeliveryTime: $stateDeliveryTime
        selectedStateDeliveryTime: $selectedStateDeliveryTime
        countryDeliveryTime: $countryDeliveryTime
        cityId: $cityId
        stateId: $stateId
        fastDelivery: $fastDelivery
        activityScope: $activityScope
        paymentDeadLine: $paymentDeadLine
        serviceRange: $serviceRange
        workingShift: $workingShift
        certificateNumber: $certificateNumber
        certificateExpireDate: $certificateExpireDate
        legalPerson: $legalPerson
        nationalId: $nationalId
      }
      id: $id
    ) {
      id
      logoUrl
      name
      address
      location
      ceoname
      contact
      storeDetails {
        economicCode
        postalCode
        email
        ceoSsn
        mobileNumber
        ceoBirthDate
        ceoGender
        ceoCity {
          id
          name
        }
        ceoState {
          id
          name
        }
        ceoPostalCode
        ceoAddress
        ceoContact
        ceoEmail
        cardMelliUrl
        lastNewspaperUrl
        mojavvezUrl
        ceoPhotoUrl
        bankCardNumber
        shebaNumber
        nameOfAccountHolder
        bankName
      }
      selectedStatesIds
      selectedStates {
        id
        name
      }
      cityDeliveryTime
      stateDeliveryTime
      selectedStateDeliveryTime
      countryDeliveryTime
      city {
        id
        name
      }
      state {
        id
        name
      }
      score
      workingShift
      paymentDeadLine
      serviceRange
      fastDelivery
      activityScope
      stuffs {
        id
      }

      orders(pagination: { page: $page, take: $take }) {
        id
      }
    }
  }
`;
