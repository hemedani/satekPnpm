import { useMutation } from "@apollo/react-hooks";
import {
  updateStore,
  updateStoreVariables,
  GQL_UPDATE_STORE,
  GQL_GET_STORE
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

export function useUpdateStoreMutate<V extends updateStoreVariables>(
  variables: V,
  client: ApolloClient<object>
) {
  const [updateStoreMutate, result] = useMutation<
    updateStore,
    updateStoreVariables
  >(GQL_UPDATE_STORE, {
    client,
    update: (store, { data: updateStoreMutate }) => {
      console.log(variables, "vataseas", updateStoreMutate!.updateStore);
      console.log(
        updateStoreMutate!.updateStore,
        ";l;",
        store.readQuery({
          query: GQL_GET_STORE,
          variables
        }),
        "slanas"
      );
      const { getStore }: any = store.readQuery({
        query: GQL_GET_STORE,
        variables
      });
      if (getStore) {
        store.writeQuery({
          query: GQL_GET_STORE,
          variables,
          data: { getStores: [updateStoreMutate!.updateStore, ...getStore] }
        });
      }
    }
  });

  return {
    updateStoreMutate,
    result
  };
}
