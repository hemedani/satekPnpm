import { useMutation } from "@apollo/react-hooks";
import {
  createWareType,
  createWareTypeVariables,
  getWareTypesVariables,
  GQL_CREATE_WARE_TYPE,
  GQL_GET_WARE_TYPES
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

export function useCreateWareTypeMutate<V extends getWareTypesVariables>(
  variables: V,
  client: ApolloClient<object>
) {
  const [createWareTypeMutate, result] = useMutation<
    createWareType,
    createWareTypeVariables
  >(GQL_CREATE_WARE_TYPE, {
    client,
    update: (store, { data: createWareTypeMutate }) => {
      const { getWareTypes }: any = store.readQuery({
        query: GQL_GET_WARE_TYPES,
        variables
      });

      store.writeQuery({
        query: GQL_GET_WARE_TYPES,
        variables,
        data: {
          getWareTypes: [createWareTypeMutate!.createWareType, ...getWareTypes]
        }
      });
    }
  });
  return {
    createWareTypeMutate,
    result
  };
}
