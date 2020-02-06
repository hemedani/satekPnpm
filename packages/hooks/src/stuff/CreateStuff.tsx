import { useMutation } from "@apollo/react-hooks";
import {
  createStuffVariables,
  createStuff,
  GQL_CREATE_STUFF,
  getStuffsForStoreVariables,
  GQL_GET_STUFFS_FOR_STORE,
  StuffSort
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

export function useCreateStuffMutate<V extends getStuffsForStoreVariables>(
  variables: V,
  client: ApolloClient<object>
) {
  const [createStuffMutate, result] = useMutation<
    createStuff,
    createStuffVariables
  >(GQL_CREATE_STUFF, {
    client,
    update: (store, { data: createStuffMutate }) => {
      console.log("is", variables, createStuffMutate!);
      if (!variables.wareDocument) {
        variables.wareDocument = "";
      }
      if (!variables.sort) {
        variables.sort = StuffSort.Price;
      }
      console.log(
        store.readQuery({
          query: GQL_GET_STUFFS_FOR_STORE,
          variables
        })
      );
      const { getStuffs }: any = store.readQuery({
        query: GQL_GET_STUFFS_FOR_STORE,
        variables
      });

      if (getStuffs) {
        store.writeQuery({
          query: GQL_GET_STUFFS_FOR_STORE,
          variables,
          data: {
            getStuffs: {
              items: [createStuffMutate!.createStuff, ...getStuffs.items],
              __typename: "PaginatedStuffResponse"
            }
          }
        });
      }
    }
  });
  return {
    createStuffMutate,
    result
  };
}
