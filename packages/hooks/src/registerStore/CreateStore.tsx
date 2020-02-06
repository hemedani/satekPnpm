import { useMutation } from "@apollo/react-hooks";
import {
  createStore,
  createStoreVariables,
  getStoresVariables,
  GQL_CREATE_STORE,
  GQL_GET_STORES
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

export function useCreateStoreMutate<V extends getStoresVariables>(
  variables: V,
  client: ApolloClient<object>
) {
  const [createStoreMutate, result] = useMutation<
    createStore,
    createStoreVariables
  >(GQL_CREATE_STORE, {
    client,
    update: (store, { data: createStoreMutate }) => {
      const { getStores }: any = store.readQuery({
        query: GQL_GET_STORES,
        variables
      });
      if (getStores) {
        store.writeQuery({
          query: GQL_GET_STORES,
          variables,
          data: { getStores: [createStoreMutate!.createStore, ...getStores] }
        });
      }
    }
  });
  return {
    createStoreMutate,
    result
  };
}
