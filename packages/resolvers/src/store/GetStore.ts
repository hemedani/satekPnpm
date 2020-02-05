import gql from "graphql-tag";

export const GQL_GET_STORE = gql`
    query getStore($id: String!, $page: Int, $take: Int) {
        getStore(id: $id) {
            id
            logoUrl
            name
            address
            location
            contact
            ceoname
            storeDetails {
                storeType
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
            selectedStates {
                id
                name
            }
            selectedStatesIds
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
            status
            activityScope
            orders(pagination: { page: $page, take: $take }) {
                id
            }
        }
    }
`;
