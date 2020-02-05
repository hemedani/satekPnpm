import gql from "graphql-tag";

export const GQL_UPDATE_WARE_TYPE = gql`
  mutation updateWareType($name: String!, $enName: String!, $id: String!) {
    updateWareType(data: { name: $name, enName: $enName }, id: $id) {
      id
      name
      enName
    }
  }
`;
