import { useMutation } from "@apollo/react-hooks";
import {
  deleteStuffVariables,
  deleteStuff,
  GQL_DELETE_STUFF,
  getStuffsForStoreVariables,
  GQL_GET_STUFFS_FOR_STORE,
  StuffSort
} from "@satek/resolvers";
import ApolloClient from "apollo-client";

export function UseDeleteStuffMutate<V extends getStuffsForStoreVariables>(
  variables: V,
  client: ApolloClient<object>
) {
  const [deleteStuffMutate, result] = useMutation<
    deleteStuff,
    deleteStuffVariables
  >(GQL_DELETE_STUFF, {
    client,
    update: (store, { data: updateStuffMutate }) => {
      if (!variables.wareDocument) {
        variables.wareDocument = "";
      }
      if (!variables.sort) {
        variables.sort = StuffSort.Price;
      }
      const { getStuffs }: any = store.readQuery({
        query: GQL_GET_STUFFS_FOR_STORE,
        variables
      });
      console.log(getStuffs, "getStuffs", updateStuffMutate);
      if (getStuffs) {
        const { items } = getStuffs;
        console.log(items, "items before");
        items.splice(
          items.findIndex(
            (v: any) => v.id === updateStuffMutate!.deleteStuff.id
          ),
          1
        );
        console.log(items, "items after");
        store.writeQuery({
          query: GQL_GET_STUFFS_FOR_STORE,
          variables,
          data: {
            getStuffs: {
              items: items,
              __typename: "PaginatedStuffResponse"
            }
          }
        });
      }
    }
  });
  return {
    deleteStuffMutate,
    result
  };
}
