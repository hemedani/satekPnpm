import gql from "graphql-tag";

export const GQL_CREATE_CITY = gql`
  mutation createCity($name: String!, $enName: String!, $stateId: String!) {
    createCity(data: { name: $name, enName: $enName, stateId: $stateId }) {
      id
      name
    }
  }
`;
