import gql from "graphql-tag";

export const GQL_LOGIN = gql`
  mutation login($device: String!, $code: String!, $phone: String!) {
    login(data: { code: $code, device: $device, phone: $phone }) {
      token
      user {
        id
        firstName
        lastName
        name
        userToSites {
          role
          id
        }
      }
    }
  }
`;
