import gql from "graphql-tag";

export const GQL_GET_ALLOWED_WARE_GROUPS_FOR_UNIT = gql`
  query getAllowedWareGroupsForUnit($id: String!, $page: Int, $take: Int) {
    getUnit(id: $id) {
      id
      name
      allowedWareGroups(pagination: { page: $page, take: $take }) {
        name
        id
      }
    }
  }
`;
