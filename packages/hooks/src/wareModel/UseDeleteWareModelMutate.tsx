import { useMutation } from "@apollo/react-hooks";
import {
  getWareModelsVariables,
  GQL_GET_WARE_MODELS,
  deleteWareModel,
  deleteWareModelVariables,
  GQL_DELETE_WARE_MODEL,
  getWareModel_getWareModel
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

export function UseDeleteWareModelMutate<V extends getWareModelsVariables>(
  variables: V,
  client: ApolloClient<object>
) {
  const [deleteWareModelMutate, result] = useMutation<
    deleteWareModel,
    deleteWareModelVariables
  >(GQL_DELETE_WARE_MODEL, {
    client,
    update: (store, { data: deleteWareModelMutate }) => {
      const { getWareModels }: any = store.readQuery({
        query: GQL_GET_WARE_MODELS,
        variables
      });
      getWareModels.splice(
        getWareModels.indexOf(
          getWareModels.find((value: getWareModel_getWareModel) => {
            value.id === deleteWareModelMutate!.deleteWareModel.id;
          })
        ),
        1
      );
      if (getWareModels) {
        store.writeQuery({
          query: GQL_GET_WARE_MODELS,
          variables,
          data: {
            getWareModels: getWareModels
          }
        });
      }
    }
  });
  return {
    deleteWareModelMutate,
    result
  };
}
