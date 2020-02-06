import { useMutation } from "@apollo/react-hooks";
import {
  getWaresVariables,
  GQL_UPDATE_WARE,
  updateWare,
  updateWareVariables
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

export function useUpdateWareMutate<V extends getWaresVariables>(
  variables: V,
  client: ApolloClient<object>
) {
  const [updateWareMutate, result] = useMutation<
    updateWare,
    updateWareVariables
  >(GQL_UPDATE_WARE, {
    client,
    update: (store, { data: updateWareMutate }) => {
      //   const { getWares }: any = store.readQuery({
      //     query: GQL_GET_WARES,
      //     variables
      //   });
      //   console.log(getWares, "its getWares...");
      //   console.log(updateWareMutate!.updateWare, "its getWares object...");
      //   if (getWares) {
      //     store.writeQuery({
      //       query: GQL_GET_WARES,
      //       variables,
      //       data: {
      //         getWares: [updateWareMutate!.updateWare, ...getWares]
      //       }
      //     });
      //   }
      //   console.log(getWares, "its getWares after...");
    }
  });
  return {
    updateWareMutate,
    result
  };
}
