import gql from "graphql-tag";

export const GQL_CREATE_STATE = gql`
  mutation createState($name: String!, $enName: String!) {
    createState(data: { name: $name, enName: $enName }) {
      id
      name
    }
  }
`;
