import { useMutation } from "@apollo/react-hooks";
import {
  createWareGroupVariables,
  createWareGroup,
  GQL_CREATE_WARE_GROUP,
  GQL_GET_WARE_GROUPS,
  getWareGroupsVariables
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

export function useCreateWareGroupMutate<V extends getWareGroupsVariables>(
  variables: V,
  client: ApolloClient<object>
) {
  const [createWareGroupMutate, result] = useMutation<
    createWareGroup,
    createWareGroupVariables
  >(GQL_CREATE_WARE_GROUP, {
    client,
    update: (store, { data: createWareGroupMutate }) => {
      const { getWareGroups }: any = store.readQuery({
        query: GQL_GET_WARE_GROUPS,
        variables
      });
      // console.log(getWareGroups, "hook wareGroup...");
      store.writeQuery({
        query: GQL_GET_WARE_GROUPS,
        variables,
        data: {
          getWareGroups: [
            createWareGroupMutate!.createWareGroup,
            ...getWareGroups
          ]
        }
      });
    }
  });
  return {
    createWareGroupMutate,
    result
  };
}
