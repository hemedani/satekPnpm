import { useMutation } from "@apollo/react-hooks";
import {
  getAllowedWareGroupsForUnitVariables,
  GQL_GET_ALLOWED_WARE_GROUPS_FOR_UNIT,
  GQL_UPDATE_ALLOWED_WARE_GROUPS_FOR_UNIT,
  updateAllowedWareGroupsForUnit,
  updateAllowedWareGroupsForUnitVariables
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

export function useUpdateAllowedWareGroupsForUnitMutate<
  V extends getAllowedWareGroupsForUnitVariables
>(variables: V, client: ApolloClient<object>) {
  const [updateAllowedWareGroupsForUnitMutate, result] = useMutation<
    updateAllowedWareGroupsForUnit,
    updateAllowedWareGroupsForUnitVariables
  >(GQL_UPDATE_ALLOWED_WARE_GROUPS_FOR_UNIT, {
    client,
    update: (store, { data: updateAllowedWareGroupsForUnitMutate }) => {
      const { getAllowedWareGroupsForUnit }: any = store.readQuery({
        query: GQL_GET_ALLOWED_WARE_GROUPS_FOR_UNIT,
        variables
      });
      store.writeQuery({
        query: GQL_GET_ALLOWED_WARE_GROUPS_FOR_UNIT,
        variables,
        data: {
          getAllowedWareGroup: [
            updateAllowedWareGroupsForUnitMutate!
              .updateAllowedWareGroupsForUnit,
            ...getAllowedWareGroupsForUnit
          ]
        }
      });
    }
  });
  return {
    updateAllowedWareGroupsForUnitMutate,
    result
  };
}
