import gql from "graphql-tag";

export const GQL_LOGIN_REQUEST = gql`
  mutation loginRequest($device: String!, $phone: String!) {
    loginRequest(data: { device: $device, phone: $phone }) {
      code
      phone
      ok
    }
  }
`;
