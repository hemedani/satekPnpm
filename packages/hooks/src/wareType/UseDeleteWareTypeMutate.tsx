import { useMutation } from "@apollo/react-hooks";
import {
  getWareTypesVariables,
  GQL_GET_WARE_TYPES,
  deleteWareType,
  deleteWareTypeVariables,
  GQL_DELETE_WARE_TYPE,
  getWareTypes_getWareTypes
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

export function UseDeleteWareTypeMutate<V extends getWareTypesVariables>(
  variables: V,
  client: ApolloClient<object>
) {
  const [deleteWareTypeMutate, result] = useMutation<
    deleteWareType,
    deleteWareTypeVariables
  >(GQL_DELETE_WARE_TYPE, {
    client,
    update: (store, { data: deleteWareTypeMutate }) => {
      const { getWareTypes }: any = store.readQuery({
        query: GQL_GET_WARE_TYPES,
        variables
      });
      getWareTypes.splice(
        getWareTypes.indexOf(
          getWareTypes.find((value: getWareTypes_getWareTypes) => {
            value.id === deleteWareTypeMutate!.deleteWareType.id;
          })
        ),
        1
      );
      if (getWareTypes) {
        store.writeQuery({
          query: GQL_GET_WARE_TYPES,
          variables,
          data: {
            getWareTypes: getWareTypes
          }
        });
      }
    }
  });
  return {
    deleteWareTypeMutate,
    result
  };
}
