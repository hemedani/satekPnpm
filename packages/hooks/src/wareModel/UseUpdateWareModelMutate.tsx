import { useMutation } from "@apollo/react-hooks";
import {
  getWareModelsVariables,
  GQL_UPDATE_WARE_MODEL,
  updateWareModel,
  updateWareModelVariables,
  GQL_GET_WARE_MODELS
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

export function useUpdateWareModelMutate<V extends getWareModelsVariables>(
  variables: V,
  client: ApolloClient<object>
) {
  const [updateWareModelMutate, result] = useMutation<
    updateWareModel,
    updateWareModelVariables
  >(GQL_UPDATE_WARE_MODEL, {
    client,
    update: (store, { data: updateWareModelMutate }) => {
      const { getWareModels }: any = store.readQuery({
        query: GQL_GET_WARE_MODELS,
        variables
      });
      if (getWareModels) {
        store.writeQuery({
          query: GQL_GET_WARE_MODELS,
          variables,
          data: {
            getWareModels: [
              updateWareModelMutate!.updateWareModel,
              ...getWareModels
            ]
          }
        });
      }
    }
  });
  return {
    updateWareModelMutate,
    result
  };
}
