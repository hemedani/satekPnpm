import { useMutation } from "@apollo/react-hooks";
import {
  updateInfoStore,
  updateInfoStoreVariables,
  GQL_UPDATE_INFO_STORE,
  GQL_GET_INFO_STORE
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

export function useUpdateInfoStoreMutate<V extends updateInfoStoreVariables>(
  variables: V,
  client: ApolloClient<object>
) {
  const [updateInfoStoreMutate, result] = useMutation<
    updateInfoStore,
    updateInfoStoreVariables
  >(GQL_UPDATE_INFO_STORE, {
    client,
    update: (store, { data: updateInfoStoreMutate }) => {
      // console.log(variables, "vataseas", updateInfoStoreMutate!.updateStore);
      // console.log(
      //   { getStore: updateInfoStoreMutate!.updateStore },
      //   "sadssssssxcjvhjxch"
      // );
      const { getStore }: any = store.readQuery({
        query: GQL_GET_INFO_STORE,
        variables
      });
      // console.log(
      //   { getStore: { ...updateInfoStoreMutate!.updateStore } },
      //   "qwertyuioasdfghjklzxcvbnm,"
      // );
      // console.log(getStore, "qwertyuioasdfghjklzxcvbnm,");

      if (getStore) {
        store.writeQuery({
          query: GQL_GET_INFO_STORE,
          variables,
          data: {
            getStore: { getStore, ...updateInfoStoreMutate!.updateStore }
          }
        });
      }
    }
  });

  return {
    updateInfoStoreMutate,
    result
  };
}
