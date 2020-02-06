import { useMutation } from "@apollo/react-hooks";
import ApolloClient from "apollo-client";
import {
  getStoreVariables,
  updateStoreStatusVariables,
  updateStoreStatus,
  GQL_UPDATE_STORE_STATUS,
  GQL_GET_STORES
} from "@satek/resolvers";

export function UseUpdateStoreStatusMutate<V extends getStoreVariables>(
  variables: V,
  client: ApolloClient<object>
) {
  const [updateStoreStatusMutate, result] = useMutation<
    updateStoreStatus,
    updateStoreStatusVariables
  >(GQL_UPDATE_STORE_STATUS, {
    client,
    update: (store, { data: updateStoreStatus }) => {
      const { getStores }: any = store.readQuery({
        query: GQL_GET_STORES,
        variables
      });
      if (getStores) {
        const { items } = getStores;
        items.splice(
          items.findIndex(
            (v: any) => v.id === updateStoreStatus!.updateStoreStatus.id
          ),
          1
        );
        items.push(updateStoreStatus!.updateStoreStatus);
        store.writeQuery({
          query: GQL_GET_STORES,
          variables,
          data: {
            getStores: items
          }
        });
      }
    }
  });
  return {
    updateStoreStatusMutate,
    result
  };
}
