import { useMutation } from "@apollo/react-hooks";
import {
  getWareGroupsVariables,
  GQL_UPDATE_WARE_GROUP,
  updateWareGroup,
  updateWareGroupVariables,
  GQL_GET_WARE_GROUPS,
  getWareGroup_getWareGroup
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

export function useUpdateWareGroupMutate<V extends getWareGroupsVariables>(
  variables: V,
  client: ApolloClient<object>
) {
  const [updateWareGroupMutate, result] = useMutation<
    updateWareGroup,
    updateWareGroupVariables
  >(GQL_UPDATE_WARE_GROUP, {
    client,
    update: (store, { data: updateWareGroupMutate }) => {
      const { getWaresGroups }: any = store.readQuery({
        query: GQL_GET_WARE_GROUPS,
        variables
      });
      getWaresGroups.splice(
        getWaresGroups.indexOf(
          getWaresGroups.find((value: getWareGroup_getWareGroup) => {
            value.id === updateWareGroupMutate!.updateWareGroup.id;
          })
        ),
        1
      );
      if (getWaresGroups) {
        store.writeQuery({
          query: GQL_GET_WARE_GROUPS,
          variables,
          data: {
            getWaresGroups: getWaresGroups
          }
        });
      }
    }
  });
  return {
    updateWareGroupMutate,
    result
  };
}
