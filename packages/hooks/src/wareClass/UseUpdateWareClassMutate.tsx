import { useMutation } from "@apollo/react-hooks";
import {
  getWareClassesVariables,
  GQL_UPDATE_WARE_CLASS,
  updateWareClass,
  updateWareClassVariables,
  GQL_GET_WARE_CLASSES
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

export function useUpdateWareClassMutate<V extends getWareClassesVariables>(
  variables: V,
  client: ApolloClient<object>
) {
  const [updateWareClassMutate, result] = useMutation<
    updateWareClass,
    updateWareClassVariables
  >(GQL_UPDATE_WARE_CLASS, {
    client,
    update: (store, { data: updateWareClassMutate }) => {
      const { getWareClasses }: any = store.readQuery({
        query: GQL_GET_WARE_CLASSES,
        variables
      });
      if (getWareClasses) {
        store.writeQuery({
          query: GQL_GET_WARE_CLASSES,
          variables,
          data: {
            getWareClasses: [
              updateWareClassMutate!.updateWareClass,
              ...getWareClasses
            ]
          }
        });
      }
    }
  });
  return {
    updateWareClassMutate,
    result
  };
}
