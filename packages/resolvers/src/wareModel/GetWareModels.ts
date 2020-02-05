import gql from "graphql-tag";

export const GQL_GET_WARE_MODELS = gql`
  query getWareModels($page: Int, $take: Int, $wareGroupId: String) {
    getWareModels(
      data: { wareGroupId: $wareGroupId }
      pagination: { page: $page, take: $take }
    ) {
      id
      name
      enName
      wareClass {
        name
        wareType {
          name
        }
      }
      wareGroup {
        name
      }
    }
  }
`;
