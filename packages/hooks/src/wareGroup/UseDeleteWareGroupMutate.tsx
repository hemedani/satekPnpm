import { useMutation } from "@apollo/react-hooks";
import {
  getWareGroupsVariables,
  GQL_GET_WARE_GROUPS,
  deleteWareGroup,
  deleteWareGroupVariables,
  GQL_DELETE_WARE_GROUP
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

export function UseDeleteWareGroupMutate<V extends getWareGroupsVariables>(
  variables: V,
  client: ApolloClient<object>
) {
  const [deleteWareGroupMutate, result] = useMutation<
    deleteWareGroup,
    deleteWareGroupVariables
  >(GQL_DELETE_WARE_GROUP, {
    client,
    update: (store, { data: deleteWareGroupMutate }) => {
      const { getWares }: any = store.readQuery({
        query: GQL_GET_WARE_GROUPS,
        variables
      });
      console.log(getWares, "its getWares...");
      console.log(
        deleteWareGroupMutate!.deleteWareGroup,
        "its getWares object..."
      );
      if (getWares) {
        store.writeQuery({
          query: GQL_GET_WARE_GROUPS,
          variables,
          data: {
            getWares: [deleteWareGroupMutate!.deleteWareGroup, ...getWares]
          }
        });
      }
      console.log(getWares, "its getWares after...");
    }
  });
  return {
    deleteWareGroupMutate,
    result
  };
}
