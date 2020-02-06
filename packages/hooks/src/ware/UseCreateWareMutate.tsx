import { useMutation } from "@apollo/react-hooks";
import {
  createWareVariables,
  createWare,
  GQL_CREATE_WARE,
  GQL_GET_WARES,
  getWaresVariables
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

export function useCreateWareMutate<V extends getWaresVariables>(
  variables: V,
  client: ApolloClient<object>
) {
  const [createWareMutate, result] = useMutation<
    createWare,
    createWareVariables
  >(GQL_CREATE_WARE, {
    client,
    update: (store, { data: createWareMutate }) => {
      const { getWares }: any = store.readQuery({
        query: GQL_GET_WARES,
        variables
      });
      console.log(getWares, "<===get wares before");
      store.writeQuery({
        query: GQL_GET_WARES,
        variables,
        data: { getWares: [createWareMutate!.createWare, ...getWares] }
      });
      console.log(createWareMutate!.createWare, "create ware...");
      console.log(getWares, "<===get wares after");
    }
  });
  return {
    createWareMutate,
    result
  };
}
