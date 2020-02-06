import { useMutation } from "@apollo/react-hooks";
import {
  getWareClassesVariables,
  deleteWareClass,
  deleteWareClassVariables,
  GQL_DELETE_WARE_CLASS,
  GQL_GET_WARE_CLASSES,
  getWareClass_getWareClass
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

export function UseDeleteWareClassMutate<V extends getWareClassesVariables>(
  variables: V,
  client: ApolloClient<object>
) {
  const [deleteWareClassMutate, result] = useMutation<
    deleteWareClass,
    deleteWareClassVariables
  >(GQL_DELETE_WARE_CLASS, {
    client,
    update: (store, { data: deleteWareClassMutate }) => {
      const { getWareClasses }: any = store.readQuery({
        query: GQL_GET_WARE_CLASSES,
        variables
      });
      getWareClasses.splice(
        getWareClasses.indexOf(
          getWareClasses.find((value: getWareClass_getWareClass) => {
            value.id === deleteWareClassMutate!.deleteWareClass.id;
          })
        ),
        1
      );
      if (getWareClasses) {
        store.writeQuery({
          query: GQL_GET_WARE_CLASSES,
          variables,
          data: {
            getWareClasses: getWareClasses
          }
        });
      }
    }
  });
  return {
    deleteWareClassMutate,
    result
  };
}
