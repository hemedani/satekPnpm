import gql from "graphql-tag";

export const GQL_CREATE_WARE_TYPE = gql`
  mutation createWareType($name: String!, $enName: String!) {
    createWareType(data: { name: $name, enName: $enName }) {
      id
      name
      enName
      wareClasses {
        id
        name
      }
    }
  }
`;
