import { useMutation } from "@apollo/react-hooks";
import {
  createWareModel,
  createWareModelVariables,
  getWareModelsVariables,
  GQL_CREATE_WARE_MODEL,
  GQL_GET_WARE_MODELS
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

export function useCreateWareModelMutate<V extends getWareModelsVariables>(
  variables: V,
  client: ApolloClient<object>
) {
  const [createWareModelMutate, result] = useMutation<
    createWareModel,
    createWareModelVariables
  >(GQL_CREATE_WARE_MODEL, {
    client,
    update: (store, { data: createWareModelMutate }) => {
      const { getWareModels }: any = store.readQuery({
        query: GQL_GET_WARE_MODELS,
        variables
      });

      store.writeQuery({
        query: GQL_GET_WARE_MODELS,
        variables,
        data: {
          getWareModels: [
            createWareModelMutate!.createWareModel,
            ...getWareModels
          ]
        }
      });
    }
  });
  return {
    createWareModelMutate,
    result
  };
}
