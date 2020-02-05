import gql from "graphql-tag";

export const GQL_CREATE_STORE = gql`
  mutation createStore(
    $logoUrl: String
    $name: String!
    $address: String!
    $location: String
    $contact: String
    $storeType: StoreType!
    $economicCode: String!
    $postalCode: String!
    $email: String!
    $ceoFirstName: String!
    $ceoLastName: String!
    $ceoSsn: String!
    $mobileNumber: String!
    $ceoBirthDate: DateTime!
    $ceoGender: Gender!
    $ceoCityId: String!
    $ceoStateId: String!
    $ceoPostalCode: String!
    $ceoAddress: String!
    $ceoContact: String!
    $ceoEmail: String!
    $cardMelliUrl: String!
    $lastNewspaperUrl: String!
    $mojavvezUrl: String!
    $ceoPhotoUrl: String!
    $bankCardNumber: String!
    $shebaNumber: String!
    $nameOfAccountHolder: String!
    $bankName: String!
    $selectedStatesIds: [String!]
    $cityDeliveryTime: DeliveryTime!
    $stateDeliveryTime: DeliveryTime
    $selectedStateDeliveryTime: DeliveryTime
    $countryDeliveryTime: DeliveryTime
    $cityId: String!
    $stateId: String!
    $fastDelivery: Boolean!
    $activityScope: ActivityScope!
    $activityType: ActivityType!
    $paymentDeadLine: PaymentDeadLine!
    $serviceRange: [ServiceRange!]!
    $workingShift: WorkingShift!
    $certificateNumber: String!
    $certificateExpireDate: DateTime!
    $legalPerson: LegalPerson!
    $nationalId: String!
  ) {
    createStore(
      data: {
        logoUrl: $logoUrl
        name: $name
        address: $address
        location: $location
        contact: $contact
        storeType: $storeType
        economicCode: $economicCode
        postalCode: $postalCode
        email: $email
        ceoFirstName: $ceoFirstName
        ceoLastName: $ceoLastName
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
        activityType: $activityType
        paymentDeadLine: $paymentDeadLine
        serviceRange: $serviceRange
        workingShift: $workingShift
        certificateNumber: $certificateNumber
        certificateExpireDate: $certificateExpireDate
        legalPerson: $legalPerson
        nationalId: $nationalId
      }
    ) {
      id
      name
    }
  }
`;
