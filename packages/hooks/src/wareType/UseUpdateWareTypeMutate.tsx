import { useMutation } from "@apollo/react-hooks";
import {
  getWareTypesVariables,
  GQL_UPDATE_WARE_TYPE,
  updateWareType,
  updateWareTypeVariables,
  GQL_GET_WARE_TYPES
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

export function useUpdateWareTypeMutate<V extends getWareTypesVariables>(
  variables: V,
  client: ApolloClient<object>
) {
  const [updateWareTypeMutate, result] = useMutation<
    updateWareType,
    updateWareTypeVariables
  >(GQL_UPDATE_WARE_TYPE, {
    client,
    update: (store, { data: updateWareTypeMutate }) => {
      const { getWareTypes }: any = store.readQuery({
        query: GQL_GET_WARE_TYPES,
        variables
      });

      if (getWareTypes) {
        store.writeQuery({
          query: GQL_GET_WARE_TYPES,
          variables,
          data: {
            getWareGroups: [
              updateWareTypeMutate!.updateWareType,
              ...getWareTypes
            ]
          }
        });
      }
    }
  });
  return {
    updateWareTypeMutate,
    result
  };
}
