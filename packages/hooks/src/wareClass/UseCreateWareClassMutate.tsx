import { useMutation } from "@apollo/react-hooks";
import {
  createWareClassVariables,
  createWareClass,
  GQL_CREATE_WARE_CLASS,
  GQL_GET_WARE_CLASSES,
  getWareClassesVariables
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

export function useCreateWareClassMutate<V extends getWareClassesVariables>(
  variables: V,
  client: ApolloClient<object>
) {
  const [createWareClassMutate, result] = useMutation<
    createWareClass,
    createWareClassVariables
  >(GQL_CREATE_WARE_CLASS, {
    client,
    update: (store, { data: createWareClassMutate }) => {
      const { getWareClasses }: any = store.readQuery({
        query: GQL_GET_WARE_CLASSES,
        variables
      });
      // console.log(getWareClasses, "hook wareGroup...");

      store.writeQuery({
        query: GQL_GET_WARE_CLASSES,
        variables,
        data: {
          getWareClasses: [
            createWareClassMutate!.createWareClass,
            ...getWareClasses
          ]
        }
      });
    }
  });
  return {
    createWareClassMutate,
    result
  };
}
