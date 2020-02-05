import gql from "graphql-tag";

export const GQL_UPDATE_ALLOWED_WARE_GROUPS_FOR_UNIT = gql`
  mutation updateAllowedWareGroupsForUnit(
    $allowedWareGroupsIds: [String!]!
    $unitId: String!
    $take: Int
    $page: Int
  ) {
    updateAllowedWareGroupsForUnit(
      data: { allowedWareGroupsIds: $allowedWareGroupsIds }
      unitId: $unitId
    ) {
      id
      name
      allowedWareGroups(pagination: { page: $page, take: $take }) {
        id
        name
      }
    }
  }
`;
